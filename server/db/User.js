const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a user'],
    },
  },
  {
    password: {
      type: String,
      required: [true],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
