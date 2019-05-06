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
    enum: ['admin', 'reader'],
  },
  bio: {
    type: String,
    maxlength: [300, 'Maximum length of bio is 300 characters'],
  },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      let salt = await bcrypt.genSalt(10);
      let encrypted = await bcrypt.hash(this.password, salt);
      this.password = encrypted;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function(password) {
    let match = await bcrypt.compare(password, this.password);
    return match;
};

export default mongoose.model('User', userSchema);
