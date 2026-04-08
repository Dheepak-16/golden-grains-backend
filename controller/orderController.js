const orderModel = require("../model/orderModel");

exports.createOrder = async (req, res) => {
    try {

        const order = await orderModel.create(req.body);

        res.status(201).send({
            success: true,
            message: "Order placed",
            order
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};



exports.getUserOrders = async (req, res) => {
    try {

        const { userId } = req.params;

        const orders = await orderModel.find({ userId });

        res.status(200).send({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

exports.getAllOrders = async (req, res) => {
  try {

    const orders = await orderModel.find().sort({ createdAt: -1 });

    res.json({ orders });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};