// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path")
// const bodyParser = require("body-parser");
// const PORT = process.env.PORT || 2000;
// const server = express();
// require("./db");
    
// server.use(cors());
// server.use(bodyParser.json());
// server.use(express.json());
// server.use(express.urlencoded({extended: false}));

// // ✅ ADD THIS
// server.get("/", (req, res) => {
//   res.send("API Running ✅");
// });

// server.use('/' , require('./app'));
// server.listen(PORT, () => {
//     console.log(`server is running on ${PORT}`);    
// })
// module.exports = server;

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

// root route
server.get("/", (req, res) => {
  res.send("API Running ✅");
});

// routes
server.use("/", require("./app"));

// ❌ remove listen
// server.listen(...)

// ✅ export for vercel
module.exports = server;