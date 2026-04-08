const BestSelling = require("../model/bestSellingModel");

exports.uploadBestSelling = async (req, res) => {
  try {
    const products = req.files.map((file, index) => ({
      name: req.body.names[index],
      price: req.body.prices[index],
      mrp: req.body.mrps[index],
      imageUrl: `/assets/${file.filename}`
    }));z

    const data = await BestSelling.findOneAndUpdate(
      {},
      { products },
      { upsert: true, new: true }
    );  

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBestSelling = async (req, res) => {
  const data = await BestSelling.findOne();
  res.json(data);
};
