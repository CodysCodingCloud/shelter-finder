import mongoose, { Document, Schema, model, connect, Types } from 'mongoose';

export interface Comment extends Document {
  user: Types.ObjectId;
  shelter: Types.ObjectId;
  rating: number;
  comment: string;
}
const commentSchema = new Schema<Comment>(
  {
    user: {
      required: [true, 'Please add a user'],
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    shelter: {
      required: [true, 'Please add a shelter'],
      type: Schema.Types.ObjectId,
      ref: 'Shelter',
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 0-5'],
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model<Comment>('Commernt', commentSchema);
