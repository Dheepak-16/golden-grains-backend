// const express = require("express");
// const router = express.Router();
// const upload = require("../utils/imageUpload");

// const {
//   getHomeSection,
//   uploadHomeSection
// } = require("../controller/homeController");

// // GET (frontend)
// router.get("/section/:type", getHomeSection);

// // POST (admin upload)
// // router.post(
// //   "/section/:type",
// //   upload.array("images", 5),
// //   uploadHomeSection
// // );


// // router.post(
// //   "/section/:type",
// //   upload.fields([
// //     { name: "images", maxCount: 10 },
// //     { name: "names" },
// //     { name: "descriptions" },
// //     { name: "prices" },
// //     { name: "units" }
// //   ]),
// //   uploadHomeSection
// // );

// router.post(
//   "/section/bestselling",
//   upload.fields([{ name: "images", maxCount: 10 }]),
//   uploadBestSelling
// );

// router.post(
//   "/section/:type",
//   upload.fields([{ name: "images", maxCount: 10 }]),
//   uploadHomeSection
// );



// module.exports = router;
