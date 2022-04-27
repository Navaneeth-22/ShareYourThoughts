const express = require("express");
const protect = require("../middlewares/authorization.js");
const router = express.Router();
const Mail = require("../model/mailModel");

router.get("/", async (req, res) => {
  let user = req.user;
  let mailId = req.id;

  console.log("mail id " + mailId);
  try {
    let mail = await Mail.findById({ _id: mailId }).exec();
    console.log("mail is +++++++" + mail);
    if (mail != null || mail != undefined) {
      if (mail.starred === false) {
        await Mail.findByIdAndUpdate(
          mailId,
          {
            starred: true,
          },
          { new: true },
          function (err, result) {
            if (err) {
              console.log("there was an error in updating starred");
              res.status(400);
            }
            console.log("upadte mail is **************" + result);
            res.status(200).send(result);
          }
        );
      } else {
        await Mail.findByIdAndUpdate(
          mailId,
          {
            starred: false,
          },
          { new: true },
          function (err, result) {
            if (err) {
              console.log("there was an error in updating starred");
              res.status(400);
            }
            console.log("upadte mail is **************" + result);
            res.status(200).send(result);
          }
        );
      }
    }
  } catch (error) {
    //res.status(200).{error}
    console.log("there was an error in finding the mail");
    res.status(400);
  }
});

module.exports = router;
