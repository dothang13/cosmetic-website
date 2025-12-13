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

  delete: async (id) => {
    // Không dùng DELETE FROM... mà dùng UPDATE để ẩn đi
    const sql = `UPDATE products SET deleted = 1 WHERE id = ?`;
    await db.query(sql, [id]);
  },

  // --- THÊM MỚI ---
  create: async (data) => {
    const sql = `INSERT INTO products (title, price, category_id, description, thumbnail) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(sql, [
      data.title,
      data.price,
      data.category_id,
      data.description,
      data.thumbnail,
    ]);
    return result.insertId;
  },

  // --- CẬP NHẬT ---
  update: async (id, data) => {
    // Nếu có ảnh mới thì cập nhật cả ảnh, không thì giữ nguyên ảnh cũ
    let sql, params;
    if (data.thumbnail) {
      sql = `UPDATE products SET title=?, price=?, category_id=?, description=?, thumbnail=? WHERE id=?`;
      params = [
        data.title,
        data.price,
        data.category_id,
        data.description,
        data.thumbnail,
        id,
      ];
    } else {
      sql = `UPDATE products SET title=?, price=?, category_id=?, description=? WHERE id=?`;
      params = [data.title, data.price, data.category_id, data.description, id];
    }
    await db.query(sql, params);
  },
};

module.exports = Product;
