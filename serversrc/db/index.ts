import conn from './conn';
const User = require('./User');
const Shelter = require('./Shelter');
import seed from './seed';
// const seed = require('./seed');
// console.log('User moddel?2');
// console.log(Object.keys(User));
// console.log(User.schema);

module.exports = {
  conn,
  User,
  Shelter,
  seed,
};
