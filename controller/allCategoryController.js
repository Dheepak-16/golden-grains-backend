const AllCategory = require("../model/allCategoryModel");

exports.uploadAllCategory = async (req, res) => {
  try {
    let { names, category, sizes, riceVariety, manufacturer } = req.body;

    // Force arrays
    if (!Array.isArray(names)) names = [names];
    if (!Array.isArray(category)) category = [category];
    if (!Array.isArray(sizes)) sizes = [sizes];
    if (!Array.isArray(riceVariety)) riceVariety = [riceVariety];
    if (!Array.isArray(manufacturer)) manufacturer = [manufacturer];

    // Parse sizes safely
    const parsedSizes = sizes.map(s => {
      try {
        return JSON.parse(s);
      } catch {
        return [];
      }
    });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images required"
      });
    }

    const categories = req.files.map((file, index) => ({
      name: names[index],
      category: category[index],
      imageUrl: `/assets/${file.filename}`,
      riceVariety: riceVariety[index],
      manufacturer: manufacturer[index],
      sizes: parsedSizes[index] || []
    }));

    const data = await AllCategory.findOneAndUpdate(
      {},
      { $push: { categories: { $each: categories } } },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Uploaded successfully",
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.getAllCategory = async (req, res) => {
  try {
    const data = await AllCategory.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.updateAllCategorySize = async (req, res) => {
  try {
    const { name, newSizes, riceVariety, manufacturer } = req.body;

    const data = await AllCategory.updateOne(
      { "categories.name": name },
      {
        $set: {
          ...(newSizes && { "categories.$.sizes": newSizes }),
          ...(riceVariety && { "categories.$.riceVariety": riceVariety }),
          ...(manufacturer && { "categories.$.manufacturer": manufacturer })
        }
      }
    );

    res.json({
      success: true,
      message: "Updated successfully",
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
