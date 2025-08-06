const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
  url: process.env.DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

module.exports = dbConfig;
