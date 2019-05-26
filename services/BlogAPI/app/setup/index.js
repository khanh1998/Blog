import mongoose from 'mongoose';
import '../models/user';
import '../models/article';
import '../models/comment';

const models = {
  User: mongoose.model('User'),
  Comment: mongoose.model('Comment'),
  Article: mongoose.model('Article'),
};

export default models;
