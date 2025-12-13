// assets/js/main.js

document.addEventListener("DOMContentLoaded", function () {
  // === 1. XỬ LÝ HIỂN THỊ ĐĂNG NHẬP / ĐĂNG XUẤT ===
  checkLoginStatus();

  // === 2. XỬ LÝ SỐ LƯỢNG GIỎ HÀNG (Cập nhật số trên icon giỏ hàng) ===
  updateCartCount();
});

function checkLoginStatus() {
  const authLink = document.getElementById("auth-link");
  if (!authLink) return; // Nếu không tìm thấy thẻ thì dừng, tránh lỗi

  // Lấy thông tin user an toàn (dùng try-catch phòng trường hợp JSON lỗi)
  let userInfo = null;
  try {
    userInfo = JSON.parse(localStorage.getItem("user_info"));
  } catch (e) {
    console.error("Lỗi đọc thông tin user:", e);
    localStorage.removeItem("user_info"); // Xóa nếu dữ liệu bị lỗi
  }

  if (userInfo) {
    // --- TRƯỜNG HỢP: ĐÃ ĐĂNG NHẬP ---
    // Hiển thị tên người dùng (Chỉ lấy tên đầu cho ngắn gọn nếu muốn)
    authLink.innerHTML = `<i class="fa-solid fa-user"></i> ${userInfo.fullname} <i class="fa-solid fa-right-from-bracket"></i>`;
    authLink.href = "#"; // Ngăn chuyển trang
    authLink.style.color = "#333"; // (Tùy chọn) Đổi màu chữ nếu cần

    // Thêm sự kiện Click để Đăng xuất
    authLink.addEventListener("click", function (e) {
      e.preventDefault();

      // Xác nhận trước khi đăng xuất
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        localStorage.removeItem("user_info"); // Xóa thông tin user
        localStorage.removeItem("cart"); // (Tùy chọn) Xóa giỏ hàng nếu muốn reset giỏ khi logout

        alert("Đăng xuất thành công!");
        window.location.href = "index.html"; // Quay về trang chủ
      }
    });
  } else {
    // --- TRƯỜNG HỢP: CHƯA ĐĂNG NHẬP ---
    authLink.innerHTML = `Đăng nhập <i class="fa-solid fa-user"></i>`;
    authLink.href = "login.html";
  }
}

// Hàm phụ: Cập nhật số lượng trên icon giỏ hàng (Để trang web chuyên nghiệp hơn)
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    // Giả sử giỏ hàng bạn lưu trong localStorage tên là 'shopping_cart'
    // Nếu chưa làm giỏ hàng thì có thể để trống hàm này
    const cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
    cartCountElement.innerText = cart.length; // Hoặc tổng số lượng item
  }
}
