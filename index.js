const express = require("express");

const app = express();

const dbConfig = require("./Model/db_config");

dbConfig;

app.get("/", (req, res) => {
  res.end("<h1>Hello World</h1>");
});

app.listen(5000, () => {
  console.log("Server is running !");
});
