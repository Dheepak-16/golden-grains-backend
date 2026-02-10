const mongoose = require("mongoose");

const bestSellingSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      price: Number,
      mrp: Number,
      imageUrl: String
    }
  ]
});

module.exports = mongoose.model("BestSelling", bestSellingSchema);
