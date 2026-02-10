const Carousel = require("../model/carouselModel");

exports.uploadCarousel = async (req, res) => {
  try {
    const images = req.files.map(file => ({
      imageUrl: `/assets/${file.filename}`
    }));

    const data = await Carousel.findOneAndUpdate(
      {},
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        images
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCarousel = async (req, res) => {
  const data = await Carousel.findOne();
  res.json(data);
};
  