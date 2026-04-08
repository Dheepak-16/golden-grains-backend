const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId:{
        type:Number,
        required:true
    },

    products:[
        {
            name:String,
            price:Number,
            quantity:Number
        }
    ],

    totalPrice:Number,

    address:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Order",orderSchema);