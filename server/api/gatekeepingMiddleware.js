const { User } = require('../db');
const { authByToken } = require('../api/jwt');
const requireToken = async (req, res, next) => {
  try {
    const user = authByToken(req.headers.token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      console.log('not an admin');
      return res.status(403).send('not an admin');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
