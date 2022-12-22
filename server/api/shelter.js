const router = require('express').Router();
const { User, Shelter } = require('../db');
// const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
// const Sequelize = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    // req.body.isAdmin = false;
    const shelter = await Shelter.find();
    res.status(200).send(shelter);
  } catch (err) {
    next(err);
  }
});
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.shelter) {
      res.status(400);
      throw new Error('please complete the form');
    } else {
      const shelter = await Shelter.create(req.body.shelter);
      res.status(200).send(shelter);
    }
  } catch (err) {
    next(err);
  }
});
// router.put('/:id', requireToken, async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     await user.update(req.body);
//     res.send(user);
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const user = await User.delete(req.user.id);
//   } catch (error) {
//     next(err);
//   }
// });

module.exports = router;
