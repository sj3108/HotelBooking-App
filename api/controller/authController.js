const User = require("../models/user");
const bcrypt = require("bcryptjs");
// const createError = require("../utils/err");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { createError } = require("../utils/err");

exports.registerController = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    ...req.body,
    password: hash,
  });
  try {
    await newUser.save();
    res.status(200).json("User has been Created");
  } catch (error) {
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPassCorrect) {
      return next(createError(400, "Invalid password or username"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ deatails: { ...otherDetails }, isAdmin });
    console.log("cookie send ");
  } catch (error) {
    next(error);
  }
};
