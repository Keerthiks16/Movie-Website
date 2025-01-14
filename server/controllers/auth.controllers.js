import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ message: "User already exists with this username" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const image = `https://avatar.iran.liara.run/public/?username=${username}`;

    const user = new User({
      username,
      email,
      password: hashpassword,
      image,
    });

    generateToken(user._id, res);

    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log(`Error is SignUp: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log(`Error is Login: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("movie-app-token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error in Logout: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const signout = async (req, res) => {
  try {
    const { username } = req.body;
    await User.deleteOne({ username: username });
    res.clearCookie("movie-app-token");
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    console.log(`Error in Signout: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authCheck = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(`Error is AuthCheck: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
