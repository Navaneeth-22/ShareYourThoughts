const express = require("express");
const protect = require("../middlewares/authorization.js");
const messagePost = require("../controllers/messageController.js");
const router = express.Router();

router.post("/", protect, messagePost);

module.exports = router;
