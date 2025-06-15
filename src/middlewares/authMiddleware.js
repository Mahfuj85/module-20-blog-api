import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

// Middleware to protect routes

export const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await UserModel.findById(decoded.user.id).select("-password"); // Exclude Password
      next();
    } catch (error) {
      console.log("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
