import mongoose from 'mongoose';
import '../models/user';

const models = {
  User: mongoose.model('User'),
};

export default models;
