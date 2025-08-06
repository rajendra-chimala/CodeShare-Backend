const express = require("express");
const cors = require("cors");

const app = express();

const dbConfig = require("./Model/db_config");

dbConfig;

app.use(express.json());
app.use(cors());
const routes = require("./Routes/Route");
app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server is running !");
});
