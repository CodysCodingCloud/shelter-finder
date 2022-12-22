const router = require('express').Router();
// const authRouter = require('./auth');
const userRouter = require('./user');

// router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/shelter', require('./shelter'));
// router.use('/products', require('./products'));

module.exports = router;
