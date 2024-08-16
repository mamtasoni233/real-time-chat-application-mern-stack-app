import express from 'express';
import {
  getUserInfo,
  login,
  signup,
  updateProfile,
} from '../controller/AuthController.js';
import { verifyAuthToken } from '../middleware/AuthMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/userInfo', verifyAuthToken, getUserInfo);
authRoutes.post('/update-profile', verifyAuthToken, updateProfile);

export default authRoutes;
