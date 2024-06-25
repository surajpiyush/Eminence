const express = require("express");
const { authorize, auth } = require("../middleware/auth");
const {
	updateOrder,
	getOrdersByUserId,
	createOrder,
	getOrders,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.post("/createOrders", auth, authorize(['user', 'admin']), createOrder);
orderRouter.put("/updateOrders/:orderId",auth, authorize(['user', 'admin']),updateOrder);
orderRouter.get("/orders/:userId",auth,authorize(["user", "admin"]),getOrdersByUserId);
orderRouter.get("/orders",auth, authorize(["admin"]), getOrders);

module.exports = orderRouter;
