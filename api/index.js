require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

require("../db");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// root
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

// routes
app.use("/", require("../app"));

module.exports = app;