const express = require("express");
const protect = require("../middlewares/authorization.js");
const getMessages = require("../controllers/getMessagesController.js");
const router = express.Router();

router.get("/", protect, getMessages);

module.exports = router;
