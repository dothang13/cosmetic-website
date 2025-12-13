const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// POST /api/orders
router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.put("/:id/status", orderController.updateStatus);

module.exports = router;
