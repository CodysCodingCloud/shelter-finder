import { authByToken } from './jwt';
import { Request, Response, NextFunction } from 'express';
export const requireToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authByToken(req.headers.authorization as String);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
// module.exports = {
//   requireToken,
// };
