import mongoose, { Schema, model, connect, Types } from 'mongoose';
export interface IShelter {
  user: Types.ObjectId;
  name: string;
  organization: string;
  addressLine1: string;
  addressLine2?: string;
  stateAbbreviation: string;
  postal: string;
  phone: string;
  openSpace?: Number;
  capacity?: Number;
  description?: string;
  requirements?: string;
}
const shelterSchema = new Schema<IShelter>(
  {
    user: {
      required: [true, 'Please add a user'],
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a user'],
    },
    organization: {
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
      required: [false, 'Please indicate open space'],
    },
    capacity: {
      type: Number,
      required: [false, 'Please indicate capacity'],
    },
    description: {
      type: String,
      required: [false],
    },
    requirements: {
      type: String,
      required: [false],
    },
  },
  { timestamps: true }
);

module.exports = model<IShelter>('Shelter', shelterSchema);
