// // const HomeSection = require("../model/HomeSectionModel");

// /* GET SECTION */
// exports.getHomeSection = async (req, res) => {
//   try {
//     const section = await HomeSection.findOne({
//       sectionType: req.params.type,
//     });

//     if (!section) {
//       return res.status(404).json({ message: "Section not found" });
//     }

//     res.json(section);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* POST / UPLOAD */
// exports.uploadHomeSection = async (req, res) => {
//   try {
//     const { type } = req.params;

//     const images = req.files?.images?.map(file => ({
//       imageUrl: `/assets/${file.filename}`
//     })) || [];

//     const section = await HomeSection.findOneAndUpdate(
//       { sectionType: type },
//       {
//         sectionType: type,
//         images
//       },
//       { upsert: true, new: true }
//     );

//     res.json({ success: true, data: section });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.uploadBestSelling = async (req, res) => {
//   try {
//     const images = req.files.images || [];

//     const products = images.map((file, index) => ({
//       name: req.body.names[index],
//       description: req.body.descriptions?.[index],
//       price: Number(req.body.prices[index]),
//       unit: req.body.units?.[index],
//       imageUrl: `/assets/${file.filename}`
//     }));

//     const data = await HomeSection.findOneAndUpdate(
//       { sectionType: "bestselling" },
//       {
//         sectionType: "bestselling",
//         products
//       },
//       { upsert: true, new: true }
//     );

//     res.json({ success: true, data });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

