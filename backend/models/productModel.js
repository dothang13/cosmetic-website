const db = require("../config/database");

const Product = {
  // Hàm 1: Lấy tất cả sản phẩm (kèm tên danh mục)
  getAll: async () => {
    const sql = `
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.deleted = 0
        `;
    // Trả về rows (dữ liệu)
    const [rows] = await db.query(sql);
    return rows;
  },

  // Hàm 2: Lấy 1 sản phẩm theo ID
  getById: async (id) => {
    const sql = `
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ? AND p.deleted = 0
        `;
    const [rows] = await db.query(sql, [id]);
    return rows[0]; // Trả về phần tử đầu tiên hoặc undefined
  },
};

module.exports = Product;
