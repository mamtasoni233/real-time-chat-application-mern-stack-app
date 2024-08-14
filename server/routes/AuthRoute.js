import express from 'express';
import { signup } from '../controller/AuthController.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);

export default authRoutes;
