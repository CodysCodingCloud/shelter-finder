import { Router } from 'express';
const router = Router();
const { User } = require('../db');
import { hashPassword, authenticateLogin, authByToken } from './jwt';
router.get('/', async (req, res, next) => {
  try {
    res.send({ message: 'hi' });
  } catch (err) {
    next(err);
  }
});
router.post('/register', async (req, res, next) => {
  try {
    // req.body.isAdmin = false;
    const user = req.body;
    if (!user.email || !user.password) {
      res.status(400);
      throw new Error('please complete the form');
    } else {
      const userExists = await User.findOne({ email: user.email });
      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }
      const newUser = await User.create({
        ...user,
        password: await hashPassword(user),
      });
      const token = await authenticateLogin(user);
      res.status(200).json(token);
    }
  } catch (err) {
    next(err);
  }
});
router.post('/login', async (req, res, next) => {
  try {
    // req.body.isAdmin = false;
    const user = req.body;
    if (!user.email || !user.password) {
      res.status(400);
      throw new Error('please enter both your email and password');
    } else {
      const token = await authenticateLogin({
        email: user.email,
        password: user.password,
      });
      res.status(200).json(token);
    }
  } catch (err) {
    next(err);
  }
});
router.post('/token', async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let user = await authByToken(req.headers.authorization);
      res.status(200).json(user);
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
