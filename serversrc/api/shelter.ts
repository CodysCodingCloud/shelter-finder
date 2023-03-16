import { Router } from 'express';
import path from 'path';
const fs = require('fs');
const router = Router();
const { User, Shelter } = require('../db');
// const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
// const Sequelize = require('sequelize')
import multer from 'multer';
import { decodeAvatarURI } from './util/avatarURi';
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
router.post('/add', upload.single('avatar'), async (req, res, next) => {
  try {
    let shelter = req.body;
    if (req.file) {
      console.log(req.file.path);
      console.log(req.protocol);
      console.log(req.hostname);
      console.log(__dirname);

      shelter.avatar = {
        data: fs.readFileSync(
          path.join(__dirname + '/../../uploads/' + req.file.filename)
        ),
        contentType: req.file.mimetype,
      };
    }
    console.log('hi', shelter.avatar);

    console.log(req.body);

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
        $and: [{ name: shelter.name }, { addressLine1: shelter.addressLine1 }],
      });
      if (sheltterExists.length > 0) {
        if (req.file) {
          fs.unlink(req.file.path, (err: Error) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
        res.status(400);
        throw new Error('Shelter already exists');
      }
      const newShelter = await Shelter.create(shelter);
      res.status(200).send(newShelter);
    }
  } catch (err) {
    next(err);
  }
});

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

router.put('/shelter-list', async (req, res, next) => {
  try {
    const shelterList = await Shelter.findAll({
      _id: req.body._id,
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
    console.log(shelter.avatar);
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
router.put('/:id', async (req, res, next) => {
  try {
    const shelter = await Shelter.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    );

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
