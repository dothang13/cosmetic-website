const db = require("../config/database");

const Order = {
  // Tạo đơn hàng (Bảng orders)
  create: async (data) => {
    const sql = `
            INSERT INTO orders (user_id, fullname, email, phone_number, address, note, total_money, status, order_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
        `;
    const [result] = await db.query(sql, [
      data.user_id,
      data.fullname,
      data.email,
      data.phone_number,
      data.address,
      data.note,
      data.total_money,
    ]);
    return result.insertId; // Trả về ID đơn hàng vừa tạo
  },

  // Lưu chi tiết đơn hàng (Bảng order_details)
  createDetail: async (orderId, productId, price, num) => {
    // Lưu ý: Cột số lượng trong SQL của bạn tên là 'num'
    const sql = `INSERT INTO order_details (order_id, product_id, price, num, total_money) VALUES (?, ?, ?, ?, ?)`;
    const total_money = price * num;
    await db.query(sql, [orderId, productId, price, num, total_money]);
  },

  getAll: async () => {
    // Lấy tất cả, sắp xếp đơn mới nhất lên đầu
    const sql = `SELECT * FROM orders ORDER BY order_date DESC`;
    const [rows] = await db.query(sql);
    return rows;
  },

  // --- THÊM HÀM NÀY: Cập nhật trạng thái ---
  updateStatus: async (id, status) => {
    const sql = `UPDATE orders SET status = ? WHERE id = ?`;
    await db.query(sql, [status, id]);
  },
};

module.exports = Order;
