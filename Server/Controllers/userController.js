import User from "../Models/User.js";
import { createJWT } from "../Utils/index.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      const token = createJWT(res, user._id);
      user.password = undefined;
      res.status(201).json({ user, token: token });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
