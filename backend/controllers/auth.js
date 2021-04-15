import User from "../models/user.js";
import { generateToken } from "../middlewares/index.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ err: "User already exists" });
    } else {
      const user = await User.create({
        username,
        email,
        password,
      });
      if (user) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ err: "Invalid user data" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.errors });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ err: "Invalid Email" });
    } else {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ err: "Invalid password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};
