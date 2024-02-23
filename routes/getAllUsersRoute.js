const express = require("express");
const protect = require("../middlewares/authorization.js");
const getAllUsers = require("../controllers/getAllUsersController.js");
const router = express.Router();

router.get("/", protect, getAllUsers);

module.exports = router;
