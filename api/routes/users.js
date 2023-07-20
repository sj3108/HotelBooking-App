const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controller/userController");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logged in!");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send(
//     "Hello user, you are logged in and you can update and delete your account !"
//   );
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send(
//     "Hello Admin, you are logged in and you can update and delete all account !"
//   );
// });

// update
router.put("/:id", verifyUser, updateUser);
// Delete
router.delete("/:id", verifyUser, deleteUser);
// get;
router.get("/:id", verifyUser, getUser);
// getAll
router.get("/", verifyAdmin, getAllUsers);

module.exports = router;
