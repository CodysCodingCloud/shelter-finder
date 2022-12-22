const mongoose = require('mongoose');

const shelterSchema = mongoose.Schema(
  {
    user: {
      required: [true, 'Please add a user'],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a user'],
    },
    addressLine1: {
      type: String,
      required: [true, 'Please add an addressLine1'],
    },
    addressLine2: {
      type: String,
      required: [false],
    },
    stateAbbreviation: {
      type: String,
      required: [true, 'Please add a State'],
    },
    postal: {
      type: String,
      required: [true, 'Please add a postalnumber'],
    },
    openSpace: {
      type: Number,
      required: [true, 'Please indicate open space'],
    },
    capacity: {
      type: Number,
      required: [true, 'Please indicate capacity'],
    },
    requirements: {
      type: String,
      required: [false],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shelter', shelterSchema);
