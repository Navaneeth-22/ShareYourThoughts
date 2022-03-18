const express = require("express");
const app = express();
const router = express.Router();

const path = require("path");

const authUser = require("../controllers/loginController.js");

__dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

router.post("/", authUser);

module.exports = router;
