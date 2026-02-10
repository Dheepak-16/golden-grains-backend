const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");
const {
  uploadBestSelling,
  getBestSelling
} = require("../controller/bestSellingController");

router.post(
  "/bestselling",
  upload.array("images", 10),
  uploadBestSelling
);

router.get("/bestselling", getBestSelling);

module.exports = router;
