import mongoose from 'mongoose';
import commentModel from '../models/user';

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 0,
    maxlength: 200,
  },
  uri: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 200,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['public', 'hidden', 'draft'],
    required: true,
  },
  body: {
    type: String,
    minlength: 150,
    maxlength: 5000,
  },
  like: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }], //to save _id of user who clicked like button
  tag: [String],
  comment: [commentModel.schema],
});


export default mongoose.model('Article', articleSchema);