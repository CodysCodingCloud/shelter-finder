const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
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
      required: [true, 'please enter a password'],
    },
    password: {
      type: String,
      required: [true, 'please enter a password'],
    },
  },
  { timestamps: true }
);
userSchema.statics.register = function () {};
module.exports = mongoose.model('User', userSchema);
