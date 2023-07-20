const Hotel = require("../models/hotel");
const Room = require("../models/room");

//create
exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
      res.status(200).json(savedRoom);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//update
exports.updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

// delete
exports.deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {}
    res.status(200).json("Room deleted Successfully");
  } catch (error) {
    next(error);
  }
};

// get
exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// getall
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

//update availibility
exports.updateRoomAvailibility = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json("Room Status has been updated.");
  } catch (err) {
    next(err);
  }
};
