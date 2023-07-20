const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected MongoDB Database ${mongoose.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log(`MongoDB database Error : ${error}`.bgRed);
  }
};

module.exports = connectDB;
