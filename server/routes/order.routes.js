const express = require("express");
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/create", createOrder);
router.get("/get-orders", getAllOrders);
router.patch("/update-orders", updateOrderStatus);

module.exports = router;

