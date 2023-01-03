import { authByToken } from './jwt';
import { Request, Response, NextFunction } from 'express';
export const requireToken = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = authByToken(req.headers.token as String);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export const isAdmin = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
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

// module.exports = {
//   requireToken,
//   isAdmin,
// };
