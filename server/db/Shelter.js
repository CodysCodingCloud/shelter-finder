const mongoose = require('mongoose');

const shelterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a user'],
    },
    addressLine1: {
      type: String,
      required: [true, 'Please add an addressLine1'],
    },
    openSpace: {
      type: Number,
      required: [true, 'Please indicate open space'],
    },
  },
  // {
  //   addressLine2: {
  //     type: String,
  //     required: [false],
  //   },
  // },
  // {
  //   stateAbbreviation: {
  //     type: String,
  //     required: [true, 'Please add a State'],
  //   },
  // },
  // {
  //   postal: {
  //     type: String,
  //     required: [true, 'Please add a postalnumber'],
  //   },
  // },
  // {
  //   capacity: {
  //     type: Number,
  //     required: [true, 'Please indicate capacity'],
  //   },
  // },
  // {

  // },
  // {
  //   requirements: {
  //     type: String,
  //     required: [false],
  //   },
  // },
  { timestamps: true }
);

module.exports = mongoose.model('shelter', shelterSchema);
