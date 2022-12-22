const router = require('express').Router();
const { User } = require('../db');
// const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
// const Sequelize = require('sequelize')

router.post('/', async (req, res, next) => {
  try {
    // req.body.isAdmin = false;
    if (!req.body.password) {
      res.status(400);
      throw new Error('please enter a password');
    } else {
      // const user = await User.create(req.body);
      res.send({ confirm: true });
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
