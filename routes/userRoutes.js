//importing modules
const express = require("express");

const {
  signup,
  login,
  updateUser,
  findAllUsers,
  deleteUser,
} = require("../controller/userController");
const auth = require("../middleware/auth");

const router = express.Router();

//signup endpoint
router.post("/signup", signup);

//login route
router.post("/login", login);
//passing the middleware function
router.patch("/update", auth.verifyToken, updateUser);
router.delete("/delete/:id", auth.verifyToken, deleteUser);
router.get("/", auth.verifyToken, findAllUsers);

module.exports = router;
