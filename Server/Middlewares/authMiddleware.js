import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.userId).select(
        "name email"
      );

      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "User not found" });
      }

      req.user = {
        userId: decodedToken.userId,
        name: user.name,
        email: user.email,
      };
      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }
  } catch (error) {
    console.error("JWT error: " + error);
    return res.status(401).json({ status: false, message: error.message });
  }
};

export { protectRoute };
