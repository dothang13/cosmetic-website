// backend/controllers/productController.js
const products = require("../data/products"); // Nhập dữ liệu từ file trên

// Logic 1: Lấy tất cả sản phẩm
exports.getAllProducts = (req, res) => {
  // Sau này thay dòng dưới bằng: const products = await ProductModel.findAll();
  res.json(products);
};

// Logic 2: Lấy chi tiết 1 sản phẩm theo ID
exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id); // Lấy ID từ URL và chuyển thành số
  const product = products.find((p) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Sản phẩm không tồn tại" });
  }
};
