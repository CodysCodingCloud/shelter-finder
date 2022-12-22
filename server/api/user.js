const router = require('express').Router();
const { User, Shelter } = require('../db');
const { hashPassword, authenticateLogin } = require('../api/jwt');
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
// const Sequelize = require('sequelize')

// register user
router.post('/register', async (req, res, next) => {
  try {
    // req.body.isAdmin = false;
    const user = req.body.user;
    if (!user.email || !user.password) {
      res.status(400);
      throw new Error('please complete the form');
    } else {
      const userExists = await User.findOne({ email: user.email });
      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }
      hashPassword(user);
      const newUser = await User.create(user);
      const token = authenticateLogin(user);
      res.status(200).json({ email: newUser.email, token });
    }
  } catch (err) {
    next(err);
  }
});
router.post('/login', async (req, res, next) => {
  try {
    // req.body.isAdmin = false;
    const user = req.body.user;
    if (!user.email || !user.password) {
      res.status(400);
      throw new Error('please enter both your email and password');
    } else {
      const token = authenticateLogin(user);
      res.status(200).json({ email: user.email, token });
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
//     next(error);
//   }
// });

module.exports = router;
