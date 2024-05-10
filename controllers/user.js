const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userDoc = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json(userDoc);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    res.status(400);
    throw new Error("User does not exit");
  }

  const checkPassword = await bcrypt.compare(password, userDoc.password);

  if (!checkPassword) {
    res.status(400);
    throw new Error("Invalid login credentials");
  }

  //generate token
  const token = generateToken(userDoc._id, userDoc.email);

  //attach cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  res.status(200).json(userDoc);
});

const profile = asyncHandler(async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json(false);
  }

  //Verify token
  const userData = jwt.verify(token, process.env.JWT_SECRET);

  if (userData) {
    const { name, email, _id } = await User.findById(userData.id);
    res.json({ id: _id, name, email });
  } else {
    res.json(false);
  }
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.status(200).json("Successfully Logged Out");
});

module.exports = { register, login, profile, logout };
