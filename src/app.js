require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Movies API");
});
app.use("/api/v1", routes);

module.exports = app;
