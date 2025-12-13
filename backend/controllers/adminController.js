// backend/controllers/adminController.js
const Admin = require("../models/adminModel");

exports.getDashboardData = async (req, res) => {
  try {
    // Gọi cả 2 hàm song song để tiết kiệm thời gian
    const [stats, recentOrders] = await Promise.all([
      Admin.getStats(),
      Admin.getRecentOrders(),
    ]);

    res.json({
      stats: stats,
      orders: recentOrders,
    });
  } catch (error) {
    console.error("Lỗi Dashboard:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};
