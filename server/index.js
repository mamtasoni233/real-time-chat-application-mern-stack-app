import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mangoose from 'mongoose';
import authRoutes from './routes/AuthRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);

/* const server = app.listen(PORT, '192.168.3.190', () => {
  console.log('server start ' + PORT);
}); */
app.listen(PORT, '0.0.0.0', () => {
  console.log('test');
  console.log('server is running on http://192.168.3.190:' + PORT);
});
mangoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(err.message);
  });
