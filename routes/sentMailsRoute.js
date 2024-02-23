const express = require("express");
const protect = require("../middlewares/authorization.js");
const sentComplaints = require("../controllers/sentMailController.js");
const starredComplaints = require("../controllers/starredMailController.js");
const router = express.Router();

router.get("/", protect, sentComplaints);
router.get("/starredMails", protect, starredComplaints);
module.exports = router;
