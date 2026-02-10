// // const mongoose = require("mongoose");

// // const HomeSectionSchema = new mongoose.Schema({
// //   sectionType: {
// //     type: String,
// //     required: true,
// //     unique: true, // carousel, organicRange
// //   },
// //   title: String,
// //   subtitle: String,
// //   images: [
// //     {
// //       imageUrl: String,
// //     }
// //   ]
// // });

// // module.exports = mongoose.model("HomeSection", HomeSectionSchema);

// const mongoose = require("mongoose");

// const HomeSectionSchema = new mongoose.Schema({
//   sectionType: {
//     type: String,
//     required: true,
//     unique: true, // carousel, organicRange, bestselling, allcategory
//   },

//   title: String,
//   subtitle: String,

//   images: [
//     {
//       imageUrl: String,
//     }
//   ],

//   /* 🔥 NEW FIELD FOR ALL CATEGORY */
//   products: [
//     {
//       name: String,
//       description: String,
//       price: Number,
//       unit: String,
//       imageUrl: String
//     }
//   ]
// });

// module.exports = mongoose.model("HomeSection", HomeSectionSchema);

