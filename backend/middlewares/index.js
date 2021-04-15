import User from '../models/user.js'
import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
};

export const requireLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    res.status(400)
    res.status(500).json({ message: 'you must be logged in' })
  } else {
    try {
      const token = authorization.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(payload);
      const user = await User.findById(payload.id).select('-password');
      // console.log(user);
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401)
      res.status(500).json({ message: 'not authorized , token failed' })
    }
  }
};

export const requireAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    res.status(500).json({ message: 'not authorized as an admin' });
  }
};

