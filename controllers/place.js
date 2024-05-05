const asyncHandler = require("express-async-handler");
const Place = require("../models/Place");
const download = require("image-downloader");

const uploadByLink = asyncHandler(async (req, res) => {
  const { link } = req.body;

  const newName = Dtae.now() + "jpg";

  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(__dirname + "/uploads/" + newName);
});

module.exports = { uploadByLink };
