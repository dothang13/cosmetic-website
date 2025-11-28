const Product = require("../models/productModel");

// Hàm hỗ trợ: Format đường dẫn ảnh
const formatProductImage = (product) => {
  if (product.thumbnail && product.thumbnail.startsWith("/img")) {
    return {
      ...product,
      thumbnail: "http://localhost:3000" + "/data" + product.thumbnail,
    };
  }
  return product;
};

// --- CONTROLLER CHÍNH ---

exports.getAllProducts = async (req, res) => {
  try {
    const rawData = await Product.getAll();
    //Format ảnh
    const products = rawData.map(formatProductImage);
    res.json(products);
  } catch (error) {
    console.error("Lỗi Controller:", error);
    res.status(500).json({ message: "Lỗi Server khi lấy danh sách" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.getById(id);

    if (product) {
      //Format ảnh
      const formattedProduct = formatProductImage(product);
      res.json(formattedProduct);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error("Lỗi Controller:", error);
    res.status(500).json({ message: "Lỗi Server khi xem chi tiết" });
  }
};
