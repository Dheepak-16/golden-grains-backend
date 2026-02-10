const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.connectionString)
.then(()=>{
    console.log("mongodb is connected");  
})
.catch(()=>{
    console.log("mongodb connection error");  
})