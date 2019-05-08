import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Minimum length of username is 3 characters'],
    maxlength: [50, 'Maximum length of username is 50 characters'],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Minimum length of email is 3 characters'],
    maxlength: [50, 'Maximum length of email is 200 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['admin', 'reader', 'writer'],
  },
  bio: {
    type: String,
    maxlength: [300, 'Maximum length of bio is 300 characters'],
  },
  avatar: {
    type: String,
  },
});

async function hashPassword(password) {
  let salt = await bcrypt.genSalt(10);
  let encrypted = await bcrypt.hash(password, salt);
  return encrypted;
}

userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password') || this.isNew) {
      let encrypted = await hashPassword(this.password);
      this.password = encrypted;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(password) {
  let match = await bcrypt.compare(password, this.password);
  return match;
};

export default mongoose.model('User', userSchema);
