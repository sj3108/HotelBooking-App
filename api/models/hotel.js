const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  distance: {
    type: String,
    require: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  CheapestPrice: {
    type: Number,
    require: true,
  },
  features: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Hotel", HotelSchema);
