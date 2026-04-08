const express = require("express");
const {createOrder,getUserOrders, getAllOrders} = require("../controller/orderController");

const router = express.Router();

router.post("/create-order",createOrder);

router.get("/user-orders/:userId",getUserOrders);

router.get("/allorders", getAllOrders);

module.exports = router;