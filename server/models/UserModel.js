import mongoose from 'mongoose';
import { genSalt } from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    color: {
      type: Number,
      required: false,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const salt = await genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('Users', userSchema);
export default User;
