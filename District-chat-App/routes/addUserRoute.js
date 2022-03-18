const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const protect = require("../middlewares/authorization.js");
const addUser = require("../controllers/addUserController.js");

__dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
router.route("/").put(addUser);

module.exports = router;
