import mongoose, { Schema, model, connect } from 'mongoose';
interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  affiliation: string;
  password: string;
  avatar: Buffer;
}
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Please add an e-mail address'],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, 'please enter a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'please enter a last name'],
    },
    affiliation: {
      type: String,
      required: [false, 'please enter an orginization'],
    },
    password: {
      type: String,
      required: [true, 'please enter a password'],
    },
    avatar: {
      type: Buffer,
      required: false,
    },
  },
  { timestamps: true }
);
userSchema.statics.register = function () {};
module.exports = model<IUser>('User', userSchema);
