import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    let token = req.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const data = await User.findById(decodedToken.userId).select(
        "name email"
      );

      req.user = {
        userId: decodedToken.userId,
        name: data.name,
        email: data.email,
      };
      next();
    }
  } catch (error) {
    console.error("JWT error: " + error);
    return res.status(401).json({ status: false, message: error.message });
  }
};

export { protectRoute };
