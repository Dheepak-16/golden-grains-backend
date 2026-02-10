const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "organicRange" // helps future reuse
  }
});

module.exports = mongoose.model("Product", productSchema);
