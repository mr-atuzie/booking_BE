const express = require("express");
const { uploadByLink } = require("../controllers/place");
const router = express.Router();

router.post("/upload-by-link", uploadByLink);

module.exports = router;
