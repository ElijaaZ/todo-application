const express = require('express');
const router = express.Router();

// validators
const {
    registerValidator,
    signinValidator
} = require("../validators/authValidators");

// Middlewares
const { verifyToken } = require("../middlewares/index");

// Controllers
const {
    register,
    signin,
    logout,
    currentUser
} = require("../controllers/auth");

router.post("/register", registerValidator, register);
router.post("/signin", signinValidator, signin);
router.post("/logout", logout);
router.get("/currentuser", verifyToken, currentUser);

module.exports = router;