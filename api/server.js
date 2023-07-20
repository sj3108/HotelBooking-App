const express = require("express");
const colors = require("colors");

//mongo connection
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/config");

//routes
const authRoute = require("./routes/auth");
const hotelRoute = require("./routes/hotel");
const roomRoutes = require("./routes/rooms");
const userRoute = require("./routes/users");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dotenv.config();

connectDB();

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/api/hotel", hotelRoute);
app.use("/room", roomRoutes);
app.use("/user", userRoute);

app.use((err, req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  // res.header("Access-Control-Allow-Credentials", true); // allows cookie to be sent
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, HEAD, DELETE");
  const errStatus = err.status || 500;
  const errMessage = err.message || "something went wrong!!";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});
app.listen(8800, () => {
  try {
    console.log(`Connected to backend!!`.bgBlue);
  } catch (error) {
    console.log("error");
  }
});
