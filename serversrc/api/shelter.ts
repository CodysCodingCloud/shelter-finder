import { Router } from 'express';
import path from 'path';
import fs from 'fs';
const router = Router();
const { User, Shelter } = require('../db');
const { requireToken } = require('./gatekeepingMiddleware');
// const Sequelize = require('sequelize')
// import { decodeAvatarURI } from './util/avatarURi';
import { authByToken } from './jwt';
import { upload } from './util/multer';

router.get('/', async (req, res, next) => {
  try {
    const shelter = await Shelter.find();
    res.status(200).send(shelter);
  } catch (err) {
    next(err);
  }
});
router.put(
  '/add',
  // requireToken,
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      let shelter = req.body;
      if (
        !shelter.name ||
        !shelter.addressLine1 ||
        !shelter.stateAbbreviation ||
        !shelter.postal ||
        !shelter.city
      ) {
        res.status(400);
        throw new Error('please complete the form');
      } else {
        const sheltterExists = await Shelter.find({
          $and: [
            { name: shelter.name },
            { addressLine1: shelter.addressLine1 },
          ],
        });
        if (sheltterExists.length > 0) {
          if (req.file) {
            fs.unlink(req.file.path, (err) => {
              if (err) {
                throw new Error('Cannot remove file');
              }
            });
          }
          res.status(400);
          throw new Error('Shelter already exists');
        }
        if (req.file) {
          shelter.avatar = '/' + req.file.filename;
        }
        const newShelter = await Shelter.create(shelter);
        res.status(200).send(newShelter);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', requireToken, async (req: any, res, next) => {
  try {
    await Shelter.delete({ user: req.user, _id: req.params.id });
    // const user = await User.delete(req.user.id);
  } catch (err) {
    next(err);
  }
});

router.get('/all-shelter-list', async (req, res, next) => {
  try {
    const shelterList = await Shelter.find({}).select({
      name: 1,
      organization: 1,
      addressLine1: 1,
      addressLine2: 1,
      city: 1,
      stateAbbreviation: 1,
      postal: 1,
      phone: 1,
      avatar: 1,
    });
    res.status(200).json(shelterList);
  } catch (err) {
    next(err);
  }
});
router.get('/all-shelter-list-paginated/:skip', async (req, res, next) => {
  try {
    let skip = Number(req.params.skip);
    const shelterList = await Shelter.find({})
      .select({
        name: 1,
        organization: 1,
        addressLine1: 1,
        addressLine2: 1,
        city: 1,
        stateAbbreviation: 1,
        postal: 1,
        phone: 1,
        avatar: 1,
        createdAt: 1,
      })
      .sort({ createdAt: 'asc' })
      .limit(5)
      .skip(skip * 5);
    res.status(200).json(shelterList);
  } catch (err) {
    next(err);
  }
});
router.put('/shelter-list', requireToken, async (req: any, res, next) => {
  try {
    const shelterList = await Shelter.find({
      user: req.user._id,
    });
    res.status(200).json(shelterList);
  } catch (err) {
    next(err);
  }
});
router.get('/user-shelter-list', requireToken, async (req: any, res, next) => {
  try {
    const shelterList = await Shelter.find({
      user: req.user._id,
    });
    res.status(200).json(shelterList);
  } catch (err) {
    next(err);
  }
});

router.put('/changeowner/:id', requireToken, async (req: any, res, next) => {
  try {
    const user = await User.find({ email: req.body.newUserEmail });
    if (!user) {
      throw new Error('email not found');
    }
    const shelter = await Shelter.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      { user: user._id },
      { new: true }
    );
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
});
router.put('/search', async (req: any, res, next) => {
  const searchQuery = String(req.body.queryStr);
  const querry = await Shelter.find({ $text: { $search: searchQuery } }).exec();
  res.status(200).json(querry);
});
router.get('/:id', async (req, res, next) => {
  try {
    const shelter = await Shelter.findOne({
      _id: req.params.id,
    });
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
});
router.get('/commented/:id', async (req, res, next) => {
  try {
    const shelter = await Shelter.findOne({
      _id: req.params.id,
    })
      .populate({
        path: 'comment',
        select: 'comment rating',
        populate: {
          path: 'user',
          select: 'name',
        },
      })
      .select({
        name: 1,
        organization: 1,
        addressLine1: 1,
        addressLine2: 1,
        city: 1,
        stateAbbreviation: 1,
        postal: 1,
        user: 1,
        avatar: 1,
      });
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
});
router.put('/:id', requireToken, async (req: any, res, next) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const query = {
      _id: req.params.id,
      $or: [
        { user: req.user._id },
        { user: '63e6d04dab9210bbfdafea62' },
        { updatedAt: { $lte: oneWeekAgo } },
      ],
    };
    const shelter = await Shelter.findOneAndUpdate(query, req.body, {
      new: true,
    });
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
