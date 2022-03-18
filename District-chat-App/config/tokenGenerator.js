const jwt = require("jsonwebtoken");

const tokenGenerator = async (id, aadhar) => {
  console.log(jwt.sign({ id, aadhar }, process.env.TOKEN_SECRET));
  return jwt.sign({ id, aadhar }, process.env.TOKEN_SECRET);
};

module.exports = tokenGenerator;
