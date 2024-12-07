import Phonebook from "../Models/PhoneBook.js";
import User from "../Models/User.js";
import Favorites from "../Models/Favorites.js";
import Trash from "../Models/Trash.js";
import Groups from "../Models/Groups.js";
import { createJWT } from "../Utils/index.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist && userExist.authProvider === "LOCAL") {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      authProvider: "LOCAL",
    });
    if (user) {
      //create a phonebook instance
      const phonebook = await Phonebook.create({
        user: user._id,
        contacts: [],
      });

      const favorite = await Favorites.create({
        user: user._id,
        contacts: [],
      });

      const trash = await Trash.create({
        user: user._id,
        contacts: [],
      });

      const groups = await Groups.create({
        user: user._id,
        groups: [],
      });

      //assign phonebook id
      user.phonebook_id = phonebook._id;
      user.favorites_id = favorite._id;
      user.trash_id = trash._id;
      user.groups_id = groups._id;
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
    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Missing fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User does not exist" });
    }

    const isMatch = await user.matchPassword(password);
    if (user && isMatch && user.authProvider === "LOCAL") {
      const token = createJWT(res, user._id);
      user.password = undefined;
      return res.status(200).json({
        status: true,
        message: "User logged in successfully",
        user,
        token: token,
      });
    } else {
      return res
        .status(401)
        .json({ status: true, message: "Invalid email or password. " });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const OAuthSignUp = async (req, res) => {
  const client = new OAuth2Client("");
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "",
    });
    const payload = ticket.getPayload();

    let userExist = await User.findOne({ email: payload.email });
    if (userExist && userExist.authProvider === "GOOGLE") {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      password: "",
      authProvider: "GOOGLE",
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
    }
  } catch (error) {
    console.error("Google auth error", error.message);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const OAuthLogin = async (req, res) => {
  const client = new OAuth2Client("");
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "",
    });
    const payload = ticket.getPayload();

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User does not exist" });
    }

    if (user && user.authProvider === "GOOGLE") {
      const token = createJWT(res, user._id);
      return res.status(200).json({
        status: true,
        message: "User logged in successfully",
        user,
        token: token,
      });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
