const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");
const {
  uploadCarousel,
  getCarousel
} = require("../controller/carouselController");

router.post(
  "/carousel",
  upload.array("images", 5),
  uploadCarousel
);

router.get("/carousel", getCarousel);

module.exports = router;
