const express = require("express");
const protect = require("../middlewares/authorization.js");
const complaintPost = require("../controllers/complaintController.js");
const router = express.Router();

router.post("/", protect, complaintPost);

module.exports = router;
