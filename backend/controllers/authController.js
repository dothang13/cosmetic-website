// backend/controllers/authController.js
const User = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    // 1. Lấy dữ liệu gửi lên từ body
    const { email, password } = req.body;

    // Kiểm tra xem có gửi đủ thông tin không
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ email và mật khẩu" });
    }

    // 2. Tìm user trong database
    const user = await User.findByEmail(email);

    // Nếu không tìm thấy user
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email không tồn tại hoặc tài khoản bị khóa" });
    }

    // 3. So sánh mật khẩu
    // LƯU Ý: Hiện tại đang so sánh text thường để test.
    // Sau này làm thật phải dùng bcrypt.compare(password, user.password)
    if (password !== user.password) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    // 4. Đăng nhập thành công -> Trả về thông tin (Trừ mật khẩu ra)
    const userData = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role_id: user.role_id, // Quan trọng: Để biết là Admin (1) hay User (2)
    };

    res.json({
      message: "Đăng nhập thành công",
      user: userData,
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};
