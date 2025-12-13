// backend/models/adminModel.js
const db = require("../config/database");

const Admin = {
  // Lấy số liệu thống kê
  getStats: async () => {
    // 1. Đếm tổng đơn hàng
    const [orders] = await db.query("SELECT COUNT(*) as total FROM orders");

    // 2. Tính tổng doanh thu (Chỉ tính các đơn không bị hủy)
    const [revenue] = await db.query(
      "SELECT SUM(total_money) as total FROM orders WHERE status != 'cancelled'"
    );

    // 3. Đếm số khách hàng (role_id = 2)
    const [customers] = await db.query(
      "SELECT COUNT(*) as total FROM users WHERE role_id = 2"
    );

    // 4. Đếm số sản phẩm (chưa bị xóa)
    const [products] = await db.query(
      "SELECT COUNT(*) as total FROM products WHERE deleted = 0"
    );

    return {
      totalOrders: orders[0].total,
      totalRevenue: revenue[0].total || 0, // Nếu chưa có đơn nào thì trả về 0
      totalCustomers: customers[0].total,
      totalProducts: products[0].total,
    };
  },

  // Lấy 5 đơn hàng gần nhất
  getRecentOrders: async () => {
    const sql = `
            SELECT id, fullname, total_money, status, order_date 
            FROM orders 
            ORDER BY order_date DESC 
            LIMIT 5
        `;
    const [rows] = await db.query(sql);
    return rows;
  },
};

module.exports = Admin;
