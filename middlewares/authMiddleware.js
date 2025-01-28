import jwt from 'jsonwebtoken';
// import User from '../models/users.js';

export const protect = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user data to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

