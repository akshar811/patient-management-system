const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(
    process.env.MONGODB_URL
  );
  console.log("database is connected");
};

module.exports = connect;

