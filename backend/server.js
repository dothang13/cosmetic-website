// backend/server.js
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3000; // Server sẽ chạy ở cổng 3000

// Middleware
app.use(cors()); // Cho phép Frontend (đang chạy ở cổng khác) gọi vào
app.use(express.json()); // Để server hiểu dữ liệu JSON

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
