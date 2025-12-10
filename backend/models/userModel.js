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
};

module.exports = User;
