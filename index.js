const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const app = express();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoute = require("./routes/user");
const placeRoute = require("./routes/place");

app.use(
  cors({
    origin: [
      "https://profound-platypus-2825d4.netlify.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/places", placeRoute);

app.get("/", (req, res) => {
  res.send("Hello world ;)");
});

app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;

    const newName = "photo" + Date.now() + ".jpg";

    await download.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });

    res.json(newName);
  } catch (error) {
    console.log(error);
  }
});

const photoMiddleware = multer({ dest: "uploads" });

app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uplodedFiles = [];

  console.log(req.files);

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);

    console.log("new");

    console.log(newPath);

    uplodedFiles.push(newPath.replace("uploads/", ""));
  }

  console.log(uplodedFiles);
  res.json(uplodedFiles);
});

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port:${PORT}`.underline.yellow);
});
