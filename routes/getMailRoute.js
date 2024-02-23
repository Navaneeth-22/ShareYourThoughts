const express = require("express");
const protect = require("../middlewares/authorization.js");
const getComplaints = require("../controllers/getMailController.js");
const router = express.Router();

router.get("/", protect, getComplaints);

module.exports = router;
