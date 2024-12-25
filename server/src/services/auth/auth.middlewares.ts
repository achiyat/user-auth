// server/src/services/auth/auth.middlewares.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to authenticate token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access token is missing" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
      }
      req.body.user = user;
      next();
    });
  }
};
