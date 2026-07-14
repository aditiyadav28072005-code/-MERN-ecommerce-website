// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
import { json } from "express";
import jwt from "jsonwebtoken"
import User from "../models/User.js";


// Checks if user is logged in (valid token)
const protect = async (req, res, next) => {
  let token;

  // Token is sent as: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from DB (excluding password) and attach to req
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Token is valid, move on to the controller
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Checks if logged-in user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

export{ protect, admin };