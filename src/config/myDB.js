const mongoose = require("mongoose");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const url = "mongodb+srv://nguyenvo709it:0944778511Quan@cluster0.igmpceb.mongodb.net/?retryWrites=true&w=majority";

const connectDB = () => {
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
      console.error(`Error connecting to the database. \n${err}`);
    });
};

module.exports = connectDB;