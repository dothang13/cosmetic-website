const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3000; // Cổng Server

// Middleware
app.use(cors()); // Cho phép Frontend (đang chạy ở cổng khác) gọi vào
app.use(express.json()); // Dữ liệu: JSON

// --- CẤU HÌNH THƯ MỤC ẢNH TĨNH ---
// backend/img
app.use("/data/img", express.static(path.join(__dirname, "data", "img")));

// Routes
// Mọi đường dẫn bắt đầu bằng /api/products sẽ được xử lý bởi productRoutes
app.use("/api/products", productRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
// Thêm route cho trang chủ
app.get("/", (req, res) => {
  res.send("Chào mừng đến với API Mỹ Phẩm!");
});
