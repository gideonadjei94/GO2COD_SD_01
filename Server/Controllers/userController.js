import Phonebook from "../Models/PhoneBook.js";
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
      //create a phonebook instance
      const phonebook = await Phonebook.create({
        user: user._id,
        contacts: [],
      });

      //assign phonebook id
      user.phonebook = phonebook._id;
      await user.save();

      //generate token
      const token = createJWT(res, user._id);
      user.password = undefined;

      return res.status(201).json({
        status: true,
        message: "User registered successfully",
        user,
        token: token,
      });
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User does not exist" });
    }

    const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
      createJWT(res, user._id);
      return res
        .status(200)
        .json({ status: true, message: "User logged in successfully" });
    } else {
      return res
        .status(401)
        .json({ status: true, message: "Invalid email or password. " });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
