// backend/models/cartModel.js
const db = require("../config/database");

const Cart = {
  // Thêm vào giỏ (Nếu có rồi thì tăng số lượng, chưa có thì thêm mới)
  add: async (userId, productId, quantity) => {
    // Cú pháp đặc biệt của MySQL: ON DUPLICATE KEY UPDATE
    // Nghĩa là: Cố gắng INSERT, nếu trùng (user_id + product_id) thì UPDATE số lượng
    const sql = `
            INSERT INTO cart (user_id, product_id, quantity) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
        `;
    await db.query(sql, [userId, productId, quantity]);
  },

  // Lấy toàn bộ giỏ hàng của 1 user
  getByUserId: async (userId) => {
    const sql = `
            SELECT c.quantity, p.id, p.title, p.price, p.thumbnail 
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        `;
    const [rows] = await db.query(sql, [userId]);
    return rows;
  },

  remove: async (userId, productId) => {
    const sql = `DELETE FROM cart WHERE user_id = ? AND product_id = ?`;
    await db.query(sql, [userId, productId]);
  },
};

module.exports = Cart;
