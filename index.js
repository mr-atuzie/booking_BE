const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const app = express();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoute = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://profound-platypus-2825d4.netlify.app",
    ],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello world ;)");
});

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port:${PORT}`.underline.yellow);
});
