const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");

const {
  uploadProducts,
  getProducts,
  deleteProduct,
  updateProduct
} = require("../controller/productController");

/* ADMIN UPLOAD */
router.post(
  "/products",
  upload.array("images", 10),
  uploadProducts
);

/* FRONTEND FETCH */
router.get("/products", getProducts);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", upload.single("image"), updateProduct);

module.exports = router;
