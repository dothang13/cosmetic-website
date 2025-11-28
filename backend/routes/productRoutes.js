// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Định nghĩa: Khi ai đó vào đường dẫn gốc (/) thì chạy hàm getAllProducts
router.get("/", productController.getAllProducts);

// Định nghĩa: Khi ai đó vào đường dẫn có ID (/:id) thì chạy hàm getProductById
router.get("/:id", productController.getProductById);

module.exports = router;
