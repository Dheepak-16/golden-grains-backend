const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");

const {
  uploadAllCategory,
  getAllCategory,
  updateAllCategorySize,
  getSingleProduct
} = require("../controller/allCategoryController");

router.post("/allcategory", upload.array("images", 60), uploadAllCategory);

router.get("/allcategory", getAllCategory);

router.put("/allcategory", updateAllCategorySize);

router.get("/productdetails/:name", getSingleProduct);

module.exports = router;
