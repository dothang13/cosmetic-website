// backend/controllers/cartController.js
const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({ message: "Thiếu thông tin mua hàng" });
    }

    await Cart.add(user_id, product_id, quantity);
    res.json({ message: "Đã thêm vào giỏ hàng thành công!" });
  } catch (error) {
    console.error("Lỗi thêm giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.getByUserId(userId);

    // Xử lý link ảnh (nếu cần, giống productController)
    const items = cartItems.map((item) => {
      if (item.thumbnail && item.thumbnail.startsWith("/img")) {
        item.thumbnail = "http://localhost:3000" + "/data" + item.thumbnail;
      }
      return item;
    });

    res.json(items);
  } catch (error) {
    console.error("Lỗi lấy giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    // Lấy thông tin từ Body của request (khi gửi method DELETE)
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ message: "Thiếu thông tin để xóa" });
    }

    await Cart.remove(user_id, product_id);
    res.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
  } catch (error) {
    console.error("Lỗi xóa giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};
