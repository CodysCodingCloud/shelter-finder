const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../db');

const jwtStr: String = process.env.JWT || 'shelter';
const saltRounds: Number = Number(process.env.SALT || 10);

export const authByToken = async (token: String) => {
  try {
    jwt.verify(token, jwtStr);
    const user = await User.findOne(jwt.decode(token).email, {});
    if (user) {
      return user;
    }
    const error = new Error('bad credentials') as Error & { status?: Number };
    error.status = 401;
    throw error;
  } catch (err) {
    const error = Error('bad credentials') as Error & { status?: Number };
    error.status = 401;
    throw error;
  }
};
export const hashPassword = async ({ password }: { password: String }) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  password = hashedPassword;
};
export const authenticateLogin = async ({
  email,
  password,
}: {
  email: String;
  password: String;
}) => {
  const user = await User.findOne({
    email,
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    var token = jwt.sign({ email: user.email }, jwtStr);
    return token;
  }
  const error = Error('bad credentials') as Error & { status?: Number };
  error.status = 401;
  throw error;
};
