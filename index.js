const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/place", placeRoute);

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
