import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
const router = express.Router();

router.post("/create", createOrder);
router.get("/get-orders", getAllOrders);
router.patch("/update-orders", updateOrderStatus);
;

export default router;
