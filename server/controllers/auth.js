const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV === "production";

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        errors: [
          { msg: "Username or email already exists.", path: "username" },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Invalid username or password" }],
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid username or password" }] });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });

    return res.json({ user: { username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password")
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("CURRENT USER ", user);
    return res.json({ ok: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Succesfully signed out." });
  } catch (err) {
    console.log(err);
  }
};
