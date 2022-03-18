const express = require("express");
const path = require("path");
const signupUser = require("../controllers/signupController.js");

const app = express();
const router = express.Router();
__dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
router.get("/", (req, res) => {
  res.status(200).render("signup");
});

router.post("/", signupUser);
module.exports = router;
