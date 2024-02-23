const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authorization.js");
const addUser = require("../controllers/addUserController.js");

router.put("/", protect, addUser);

module.exports = router;
