const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");

const {
  uploadProducts,
  getProducts
} = require("../controller/productController");

/* ADMIN UPLOAD */
router.post(
  "/products",
  upload.array("images", 10),
  uploadProducts
);

/* FRONTEND FETCH */
router.get("/products", getProducts);

module.exports = router;
