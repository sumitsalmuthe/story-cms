const express = require("express");

const {
  registerUser,
  loginUser,
  becomeWriter,
} = require("../controllers/authController");

const router = express.Router();

const protect = require("../middleware/protect");

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.put(
  "/become-writer",
  protect,
  becomeWriter
);

module.exports = router;