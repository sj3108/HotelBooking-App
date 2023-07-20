const Hotel = require("../models/hotel");
const Room = require("../models/room");
// const { set } = require("mongoose");

exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
    console.log("saved");
  } catch (error) {
    next(error);
  }
};
//update
exports.updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

//delete
exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted Successfully");
  } catch (error) {
    next(error);
  }
};

//get
exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// getall

exports.getAllHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      CheapestPrice: { $gt: min || 1, $lt: max || 9999 },
    }).limit(limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

//count by citites

exports.countByCities = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

//count by Type

exports.countByType = async (req, res, next) => {
  try {
    const HotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: HotelCount },
      { type: "apartments", apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

exports.getHoteRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
