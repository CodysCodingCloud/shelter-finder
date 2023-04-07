import mongoose, { Document, Schema, model, connect, Types } from 'mongoose';
export interface IShelter extends Document {
  user: Types.ObjectId;
  name: string;
  organization: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateAbbreviation: string;
  postal: string;
  phone: string;
  openSpace?: number;
  capacity?: number;
  description?: string;
  avatar?: string;
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
    city: {
      type: String,
      required: [true, 'Please add an city'],
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
    avatar: {
      type: String,
      // data: Buffer,
      // contentType: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
shelterSchema.index(
  {
    name: 'text',
    requirements: 'text',
    description: 'text',
    postal: 'text',
    city: 'text',
    stateAbbreviation: 'text',
  },
  {
    weights: {
      name: 5,
      requirements: 2,
      description: 2,
      postal: 3,
      city: 2,
      stateAbbreviation: 1,
    },
  }
);
module.exports = model<IShelter>('Shelter', shelterSchema);
