const express = require("express");
const protect = require("../middlewares/authorization.js");
const sentComplaints = require("../controllers/sentMailController.js");
const router = express.Router();

router.get("/", protect, sentComplaints);

module.exports = router;
