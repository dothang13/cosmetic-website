const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const db = require("../config/database"); // Để dùng transaction nếu cần

exports.createOrder = async (req, res) => {
  try {
    const { user_id, fullname, email, phone_number, address, note } = req.body;

    // 1. Lấy lại giỏ hàng từ Database (để đảm bảo tính tiền đúng)
    const cartItems = await Cart.getByUserId(user_id);

    if (cartItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Giỏ hàng trống, không thể thanh toán" });
    }

    // 2. Tính tổng tiền hàng (Subtotal)
    let subTotal = 0;
    cartItems.forEach((item) => {
      subTotal += item.price * item.quantity;
    });

    // Phí vận chuyển cố định (khớp với HTML của bạn)
    const shippingFee = 30000;
    const finalTotal = subTotal + shippingFee;

    // 3. Tạo đơn hàng trong bảng 'orders'
    const orderId = await Order.create({
      user_id,
      fullname,
      email,
      phone_number,
      address,
      note,
      total_money: finalTotal,
    });

    // 4. Lưu từng món hàng vào bảng 'order_details'
    for (const item of cartItems) {
      await Order.createDetail(
        orderId,
        item.product_id,
        item.price,
        item.quantity
      );
    }

    // 5. Quan trọng: Xóa giỏ hàng sau khi đặt thành công
    await db.query("DELETE FROM cart WHERE user_id = ?", [user_id]);

    res.json({ message: "Đặt hàng thành công!", orderId: orderId });
  } catch (error) {
    console.error("Lỗi đặt hàng:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

// --- API ADMIN: Cập nhật trạng thái ---
exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body; // Lấy status mới gửi lên (pending, shipped...)

    await Order.updateStatus(id, status);
    res.json({ message: "Cập nhật trạng thái thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};
