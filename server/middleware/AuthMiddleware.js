import jwt from 'jsonwebtoken';

export const verifyAuthToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'You are not Authenticated!' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.userId = payload.userId;
    next();
  });
};
