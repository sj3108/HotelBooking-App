const express = require("express");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailibility,
} = require("../controller/roomController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// create
router.post("/:hotelid", verifyAdmin, createRoom);
// update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailibility);
// Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
// get;
router.get("/:id", getRoom);
// getAll
router.get("/", getAllRooms);

module.exports = router;
