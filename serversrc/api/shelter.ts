import { Router } from 'express';
import path from 'path';
import fs from 'fs';
const router = Router();
const { User, Shelter } = require('../db');
const { requireToken } = require('./gatekeepingMiddleware');
// const Sequelize = require('sequelize')
import multer from 'multer';
import { decodeAvatarURI } from './util/avatarURi';
import { authByToken } from './jwt';
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname);
  },
});

var upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/' });
router.get('/', async (req, res, next) => {
  try {
    // req.body.isAdmin = false;
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
        !shelter.capacity
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
          // if (req.file) {
          //   fs.unlink(req.file.path, (err) => {
          //     if (err) {
          //       throw new Error('Cannot create file');
          //     }
          //   });
          // }
          res.status(400);
          throw new Error('Shelter already exists');
        }
        if (req.file) {
          shelter.avatar = {
            data: fs.readFileSync(
              path.join(__dirname + '/../../uploads/' + req.file.filename)
            ),
            contentType: req.file.mimetype,
          };
        }
        const newShelter = await Shelter.create(shelter);
        console.log(newShelter._id);
        res.status(200).send(newShelter);
      }
    } catch (err) {
      next(err);
    }
  }
);

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const user = await User.delete(req.user.id);
//   } catch (error) {
//     next(err);
//   }
// });

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
      user: 1,
    });
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
router.get('/shelter-list', requireToken, async (req: any, res, next) => {
  try {
    const shelterList = await Shelter.find({
      user: req.user._id,
    });
    res.status(200).json(shelterList);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const shelter = await Shelter.findOne({
      _id: req.params.id,
    });
    const avatarDataURI = decodeAvatarURI(shelter);

    res.status(200).json({
      _id: shelter._id,
      user: shelter.user,
      name: shelter.name,
      organization: shelter.organization,
      addressLine1: shelter.addressLine1,
      addressLine2: shelter.addressLine2,
      city: shelter.city,
      stateAbbreviation: shelter.stateAbbreviation,
      postal: shelter.postal,
      openSpace: shelter.openSpace,
      capacity: shelter.capacity,
      description: shelter.description,
      requirements: shelter.requirements,
      avatar: avatarDataURI,
    });
  } catch (err) {
    next(err);
  }
});
router.put('/:id', requireToken, async (req: any, res, next) => {
  try {
    const shelter = await Shelter.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true }
    );
    // shelter.update(req.body)

    const avatarDataURI = decodeAvatarURI(shelter);

    res.status(200).json({
      _id: shelter._id,
      user: shelter.user,
      name: shelter.name,
      organization: shelter.organization,
      addressLine1: shelter.addressLine1,
      addressLine2: shelter.addressLine2,
      city: shelter.city,
      stateAbbreviation: shelter.stateAbbreviation,
      postal: shelter.postal,
      openSpace: shelter.openSpace,
      capacity: shelter.capacity,
      description: shelter.description,
      requirements: shelter.requirements,
      avatar: avatarDataURI,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
