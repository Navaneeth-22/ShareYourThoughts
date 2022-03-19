const express = require("express");
const router = express.Router();

const authUser = require("../controllers/loginController.js");
router.get("/", (req, res) => {
  res.status(200).render("login");
});
router.post("/", authUser);
router.get("/user/:name", (req, res) => {
  let name = req.params.name;
  console.log("name is" + name);
  res.render("home", { name: name });
});

module.exports = router;
