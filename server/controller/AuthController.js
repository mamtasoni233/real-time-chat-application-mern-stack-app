import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const extistingUser = await User.findOne({ email: email });
    if (extistingUser) {
      return res.status(400).json({ message: 'User already existing....!' });
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and Password is Required' });
    }
    const user = await User.create({ email, password });
    res.cookie('jwt', createToken(email, userId), {
      maxAge,
      secure: true,
      sameSite: 'None',
    });

    const users = {
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
    };

    res.status(201).json({ users, message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
