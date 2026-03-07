require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();
require("./db");

server.use(cors());
server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/", require("./app"));

module.exports = server;