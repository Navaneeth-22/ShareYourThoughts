const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connec = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`mongoDB connected : ${connec.connection.host}`);
  } catch (error) {
    console.log(`error : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
