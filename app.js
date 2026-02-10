const express = require("express");
const app = express();
// app.use("/api/product", require("./router/productRouter"));
app.use("/api/auth" , require("./router/userRouter"))
// app.use("/api", require("./router/uploadRouter"));
// app.use("/api/home", require("./router/homeRouter"));
app.use("/api", require("./router/carouselRouter"));
app.use("/api", require("./router/productRouter"));
app.use("/api", require("./router/bestSellingRouter"));
app.use("/api", require("./router/allCategoriesRouter"));
app.use("/assets", express.static("assets"));

module.exports = app;   






