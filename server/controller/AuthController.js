import { compare } from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};
export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { email, password } = req.body;
  try {
    // const extistingUser = await User.findOne({ email: email });
    // if (extistingUser) {
    //   return res.status(400).json({ message: 'User already existing....!' });
    // }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and Password are Required' });
    }
    const user = await User.create({ email, password });

    res.cookie('token', createToken(email, user.id), {
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User with given email not found!' });
    }
    const matchPassword = await compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: 'Invalid Password!' });
    }
    res.cookie('token', createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: 'None',
    });
    const users = {
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      color: user.color,
    };
    res.status(200).json({ users, message: 'You are logged in successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userDetails = await User.findById(req.userId);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json({
      id: userDetails.id,
      email: userDetails.email,
      profileSetup: userDetails.profileSetup,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      avatar: userDetails.avatar,
      color: userDetails.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName) {
      return res.status(400).send('Firstname, lastname and color is required ');
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true }
    );

    res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      avatar: userData.avatar,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
