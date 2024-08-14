import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mangoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log('server start ' + PORT);
});

mangoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(err.message);
  });
