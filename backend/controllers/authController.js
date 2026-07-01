const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// REGISTER
const registerUser = async (req, res) => {

  try {

    const {
      username,
      email,
      password,
    } = req.body;

    if (!username || !email || !password) {

      return res.status(400).json({
        message: "Please fill all fields",
      });

    }

    if (password.length < 8) {

      return res.status(400).json({
        message:
          "Password must be at least 8 characters",
      });

    }

    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message:
          "Email already registered",
      });

    }

    const user =
      await User.create({

        username,
        email,
        password,

      });

    res.status(201).json({

      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      verified: user.verified,
      token: generateToken(user._id),

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// LOGIN
const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (
      user &&
      (await user.matchPassword(password))
    ) {

      return res.json({

        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        verified: user.verified,
        token: generateToken(user._id),

      });

    }

    return res.status(401).json({
      message:
        "Invalid email or password",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// BECOME WRITER
const becomeWriter = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    if (user.role === "writer") {

      return res.status(400).json({
        message: "You are already a writer",
      });

    }

    user.role = "writer";

    await user.save();

    res.json({

      message: "Congratulations! You are now a Writer 🎉",

      _id: user._id,

      username: user.username,

      email: user.email,

      avatar: user.avatar,

      role: user.role,

      verified: user.verified,

      token: generateToken(user._id),

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  registerUser,
  loginUser,
  becomeWriter,
};