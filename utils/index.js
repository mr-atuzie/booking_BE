const jwt = require("jsonwebtoken");
const multer = require("multer");

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { generateToken };
