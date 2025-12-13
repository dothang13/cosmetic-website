// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// GET: /api/admin/dashboard
router.get("/dashboard", adminController.getDashboardData);

module.exports = router;
