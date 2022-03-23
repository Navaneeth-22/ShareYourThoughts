const express = require("express");
const signupUser = require("../controllers/signupController.js");
const protect = require("../middlewares/authorization.js");
const getroom = require("../controllers/getroom.js");
const router = express.Router();

router.get("/", protect, getroom);

module.exports = router;
