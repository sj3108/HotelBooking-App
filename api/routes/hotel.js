const express = require("express");
const Hotel = require("../models/hotel");

const {
  createHotel,
  getHotel,
  deleteHotel,
  updateHotel,
  getAllHotels,
  countByCities,
  countByType,
  getHoteRooms,
} = require("../controller/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

// create
router.post("/", verifyAdmin, createHotel);

// update
router.put("/:id", verifyAdmin, updateHotel);
// Delete
router.delete("/:id", verifyAdmin, deleteHotel);
// get;
router.get("/find/:id", getHotel);
// getAll
router.get("/", getAllHotels);

router.get("/countByCity", countByCities);
router.get("/countByType", countByType);
router.get("/room/:id", getHoteRooms);

module.exports = router;
