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
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    const userDoc = await User.findById(verified.id);
    res.json({ name: userDoc.name, id: userDoc._id, email: userDoc.email });
  } else {
    return res.json(fasle);
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  const token = req.cookies.token;

  return res.status(200).json({
    success: true,
    token,
    message: "Log out Successful",
  });
});

module.exports = { register, login, profile, logout };
