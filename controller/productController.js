const Product = require("../model/productModel");

/* ✅ UPLOAD ORGANIC RANGE PRODUCTS */
exports.uploadProducts = async (req, res) => {
  try {
    const products = req.files.map((file, index) => ({
      name: req.body.names[index],
      imageUrl: `/assets/${file.filename}`,
      category: "organicRange"
    }));

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
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE PRODUCT */
exports.updateProduct = async (req, res) => {
  try {
    const { name } = req.body;

    const updateData = {
      name
    };

    if (req.file) {
      updateData.imageUrl = `/assets/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, updated });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
