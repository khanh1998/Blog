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

userSchema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);

      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);

        user.password = hash;
        next();
      });
    });
  } else return next();
});

userSchema.methods.comparePassword = async function (password) {
  try {
    const user = this;
    let matches = await bcrypt.compare(password, user.password);
    if (matches) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

export default mongoose.model('User', userSchema);
