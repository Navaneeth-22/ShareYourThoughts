const express = require("express");
const signupUser = require("../controllers/signupController.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("signup");
});

router.post("/", signupUser);
module.exports = router;
