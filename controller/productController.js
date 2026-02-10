const Product = require("../model/productModel");

/* ✅ UPLOAD ORGANIC RANGE PRODUCTS */
exports.uploadProducts = async (req, res) => {
  try {
    const products = req.files.map((file, index) => ({
      name: req.body.names[index],
      imageUrl: `/assets/${file.filename}`,
      category: "organicRange"
    }));

    await Product.deleteMany({ category: "organicRange" }); // replace old
    const data = await Product.insertMany(products);

    res.json({
      success: true,
      message: "Organic range uploaded",
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ✅ GET ORGANIC RANGE PRODUCTS */
exports.getProducts = async (req, res) => {
  try {
    const data = await Product.find({ category: "organicRange" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
