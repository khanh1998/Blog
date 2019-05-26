import mongoose from 'mongoose';

let SubcommentSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2000,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
let commentSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2000,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  reply: [SubcommentSchema]
});
export default mongoose.model('Comment', commentSchema);