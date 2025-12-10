
// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/user.model.js";

dotenv.config();


export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token; // Check for token in cookies (don't use const here)

    // Debug logging
    console.log('Auth middleware - Cookies:', req.cookies);
    console.log('Auth middleware - Authorization header:', req.headers.authorization);

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      console.log('Auth middleware - Using Bearer token from header');
    }

    if (!token) {
      console.log('Auth middleware - No token found');
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Token decoded successfully:', decoded.id);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.log('Auth middleware - User not found');
      return res.status(401).json({ message: "User not found" });
    }

    console.log('Auth middleware - User authenticated:', req.user.email);
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
