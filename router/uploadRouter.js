// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const upload = require("../utils/imageUpload");
// const Upload = require("../model/uploadModel");

// const router = express.Router();

// // /* SINGLE IMAGE */
// // router.post("/upload-single", upload.single("image"), async (req, res) => {
// //     try {
// //         const { title, description } = req.body;

// //         const data = new Upload({
// //             title,
// //             description,
// //             image: req.file.filename
// //         });

// //         await data.save();

// //         res.json({ success: true, message: "Single image uploaded" });
// //     } catch (err) {
// //         res.status(500).json({
// //             error: err.message
// //         });
// //     }
// // });



// /* MULTIPLE IMAGES */
// router.post("/upload-multiple", upload.array("images", 5), async (req, res) => {
//     try {
//         const { title, description } = req.body;

//         const imageNames = req.files.map(file => file.filename);

//         const data = new Upload({
//             title,
//             description,
//             images: imageNames
//         });

//         await data.save();

//         res.json({
//             success: true,
//             message: "Multiple images uploaded"
//         });
//     } catch (err) {
//         res.status(500).json({
//             error: err.message
//         });
//     }
// });

// router.get("/uploads", async (req, res) => {
//     const data = await Upload.find();
//     res.json(data);
// });

// module.exports = router;

// // router.delete("/upload-image/:id", async (req, res) => {
// //     //  console.log("DELETE ROUTE HIT");
// //     try {
// //         const { id } = req.params;
// //         const { imageName } = req.body;

// //         // find record
// //         const data = await Upload.findById(id);
// //         if (!data) {
// //             return res.status(404).json({
// //                 message: "Record not found"
// //             });
// //         }

// //         // remove image name from array
// //         data.images = data.images.filter(img => img !== imageName);

// //         // delete image file from assets folder
// //         const imagePath = path.join(__dirname, "../assets", imageName);
// //         if (fs.existsSync(imagePath)) {
// //             fs.unlinkSync(imagePath);
// //         }

// //         await data.save();

// //         res.json({
// //             success: true,
// //             message: "Image deleted successfully"
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             error: error.message
// //         });
// //     }
// // });



