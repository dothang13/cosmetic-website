// backend/routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// POST: /api/cart/add (Thêm vào giỏ)
router.post("/add", cartController.addToCart);

// GET: /api/cart/:userId (Lấy giỏ hàng của user)
router.get("/:userId", cartController.getCart);

router.delete("/remove", cartController.removeCartItem);

module.exports = router;
