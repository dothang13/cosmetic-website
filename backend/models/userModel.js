// backend/models/userModel.js
const db = require("../config/database");

const User = {
  // Tìm user bằng email
  findByEmail: async (email) => {
    // Chỉ lấy tài khoản đang hoạt động (is_active = 1)
    const sql = `SELECT * FROM users WHERE email = ? AND is_active = 1`;
    const [rows] = await db.query(sql, [email]);

    // Trả về user tìm thấy hoặc undefined
    return rows[0];
  },
  create: async (fullname, email, password) => {
    // Mặc định role_id = 2 (User thường), is_active = 1
    const sql = `INSERT INTO users (fullname, email, password, role_id, is_active) VALUES (?, ?, ?, 2, 1)`;
    const [result] = await db.query(sql, [fullname, email, password]);
    return result.insertId;
  },
};

module.exports = User;
