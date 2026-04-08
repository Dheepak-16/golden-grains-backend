const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");

const {
  uploadAllCategory,
  getAllCategory,
  updateAllCategorySize,
  getSingleProduct,
  deleteProduct,
  updateProduct
} = require("../controller/allCategoryController");

router.post("/allcategory", upload.array("images", 60), uploadAllCategory);

router.get("/allcategory", getAllCategory);

router.put("/allcategory", updateAllCategorySize);

router.get("/productdetails/:name", getSingleProduct);

router.post("/deleteproduct", deleteProduct);

router.post("/updateproduct", updateProduct);

module.exports = router;
