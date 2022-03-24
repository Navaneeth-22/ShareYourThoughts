const { request } = require("express");

const chatPage = async (req, res) => {
  const user = req.user;
  const id = request.params.id;
  console.log(id);
  res.render("chatpage", { id: id });
};

module.exports = chatPage;
