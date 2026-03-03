const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  label: String,
  price: Number,
  mrp: Number
}, { _id: false });

const categorySchema = new mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String,
  riceVariety: String,
  manufacturer: String,
  sizes: [sizeSchema]
}, { _id: false });

const allCategorySchema = new mongoose.Schema({
  categories: [categorySchema]
});

module.exports = mongoose.model("AllCategory", allCategorySchema);
