const express = require("express");
const router = express.Router();
const { verifyToken, requiredSignIn } = require("../middleware/auth");
const Order = require("../controller/order.controller");

router.post("/create-order", requiredSignIn, Order.createOrder);
router.get("/orders", requiredSignIn, Order.viewOrders);
router.get("/view-orders", requiredSignIn, Order.getOrders);
router.get("/view-order-detail/:orderID", Order.viewOrderDetail);
router.delete("/delete-order/:orderID", requiredSignIn, verifyToken, Order.deleteOrder);
router.patch("/update-order/:orderID", requiredSignIn, verifyToken, Order.updateOrder);

module.exports = router;