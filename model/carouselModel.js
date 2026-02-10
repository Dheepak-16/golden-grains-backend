const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  images: [{ imageUrl: String }]
});

module.exports = mongoose.model("Carousel", carouselSchema);
