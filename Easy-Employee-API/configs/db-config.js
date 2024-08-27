require("dotenv").config(); // Ensure dotenv is loaded
const mongoose = require("mongoose");
const { DB_URL } = process.env;

const dbConnection = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connection Successful"))
    .catch((err) => {
      console.error("Failed To Connect With Database");
    //   console.error("Reason:", err.message);
      process.exit(1); // Exit the process if the database connection fails
    });
};

module.exports = dbConnection;
