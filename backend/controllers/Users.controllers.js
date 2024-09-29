import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../models/Users.models.js";

const login = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res
    .header("Authorization", `Bearer ${token}`)
    .json({ message: "Logged in successfully", token, userID: user._id });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    // Optionally: Generate JWT Token to log in the user immediately
    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token, // Send token to the client
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  const users = await Users.find({});
  res.status(200).json({ users });
  try {
  } catch (error) {
    res.status(404).json({ error: "Not found" });
    console.log(error);
  }
};
export { register, login, getAllUsers };
