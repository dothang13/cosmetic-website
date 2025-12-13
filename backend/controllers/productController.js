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

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.delete(id);
    res.json({ message: "Đã xóa sản phẩm thành công" });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, price, category_id, description } = req.body;
    // Xử lý đường dẫn ảnh upload
    const thumbnail = req.file ? `/img/products/${req.file.filename}` : null;

    await Product.create({ title, price, category_id, description, thumbnail });
    res.json({ message: "Thêm sản phẩm thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, category_id, description } = req.body;
    // Nếu có file mới thì lấy đường dẫn mới, không thì undefined
    const thumbnail = req.file
      ? `/img/products/${req.file.filename}`
      : undefined;

    await Product.update(id, {
      title,
      price,
      category_id,
      description,
      thumbnail,
    });
    res.json({ message: "Cập nhật thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};
