const express = require("express");
const signupUser = require("../controllers/signupController.js");
const protect = require("../middlewares/authorization.js");
const chatPage = require("../controllers/chatPage.js");
const router = express.Router();

router.get("/", protect, chatPage);

module.exports = router;
