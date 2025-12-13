// Cấu hình đường dẫn API (Chạy ở cổng 3000)
const API_URL = "http://localhost:3000/api/auth";

// === 1. XỬ LÝ ĐĂNG NHẬP ===
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Chặn load lại trang

    // Lấy dữ liệu từ form
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      // Gửi yêu cầu POST lên Backend
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Đọc phản hồi từ Server
      const data = await response.json();

      // Kiểm tra kết quả
      if (!response.ok) {
        // Nếu lỗi (Sai pass, không tìm thấy email...)
        alert(data.message || "Đăng nhập thất bại!");
        return;
      }

      // --- NẾU ĐĂNG NHẬP THÀNH CÔNG ---
      alert("Đăng nhập thành công!");
      console.log("Thông tin user:", data.user);

      // 1. Lưu thông tin user vào bộ nhớ trình duyệt để dùng ở các trang khác
      localStorage.setItem("user_info", JSON.stringify(data.user));

      // 2. Kiểm tra quyền (Role) để chuyển hướng
      // role_id = 1 là Admin, role_id = 2 là User (theo DB đã thiết kế)
      if (data.user.role_id === 1) {
        window.location.href = "admin/dashboard.html"; // Trang quản trị
      } else {
        window.location.href = "index.html"; // Trang chủ bán hàng
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Không thể kết nối đến Server. Vui lòng kiểm tra lại Backend!");
    }
  });
}

// === 2. XỬ LÝ ĐĂNG KÝ ===
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Chặn load lại trang

    // Lấy dữ liệu từ form
    const fullname = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const repass = document.getElementById("reg-repass").value;

    // 1. Kiểm tra mật khẩu nhập lại
    if (password !== repass) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    // 2. Gửi API lên Server
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullname,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Đăng ký thành công
        alert("🎉 " + data.message);
        window.location.href = "login.html"; // Chuyển sang trang đăng nhập
      } else {
        // Lỗi (Email trùng, lỗi server...)
        alert("Lỗi: " + data.message);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Không thể kết nối đến Server!");
    }
  });
}
