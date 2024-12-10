const express = require("express");
const router = express.Router();
const { protectAdmin } = require("../middleware/authMiddleware");

const {
  createNewRoom,
  getAllRooms,
  getRoom,
  deleteRoom,
  updateRoom,
} = require("../controller/RoomController");

router.post("/create-room", protectAdmin, createNewRoom);
router.get("/", protectAdmin, getAllRooms);
router.get("/get-room/:roomId", protectAdmin, getRoom);
router.patch("/update-room/:roomId", protectAdmin, updateRoom);
router.delete("/delete-room/:roomId", protectAdmin, deleteRoom);

module.exports = router;
