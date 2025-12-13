document.addEventListener("DOMContentLoaded", function () {
  // 1. Kiểm tra đăng nhập
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  if (!userInfo) {
    alert("Vui lòng đăng nhập để thanh toán!");
    window.location.href = "login.html";
    return;
  }

  // 2. Tự động điền thông tin người dùng có sẵn vào Form
  document.getElementById("fullname").value = userInfo.fullname || "";
  document.getElementById("email").value = userInfo.email || "";
  document.getElementById("phone").value = userInfo.phone_number || ""; // Nếu trong user_info có sđt
  document.getElementById("address").value = userInfo.address || ""; // Nếu trong user_info có địa chỉ

  // 3. Tải thông tin đơn hàng (Sản phẩm & Tổng tiền)
  loadCheckoutCart(userInfo.id);

  // 4. Xử lý sự kiện bấm nút "ĐẶT HÀNG NGAY"
  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Lấy phương thức thanh toán
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    ).value;
    if (paymentMethod === "banking") {
      alert("Chức năng thanh toán Online đang bảo trì. Vui lòng chọn COD.");
      return;
    }

    // Thu thập dữ liệu
    const orderData = {
      user_id: userInfo.id,
      fullname: document.getElementById("fullname").value,
      phone_number: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      note: document.getElementById("note").value,
    };

    try {
      // Gửi API Đặt hàng
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        // Xóa giỏ hàng LocalStorage để đồng bộ
        localStorage.removeItem("shopping_cart");

        alert("🎉 Đặt hàng thành công! Mã đơn hàng: #" + result.orderId);
        window.location.href = "index.html"; // Chuyển về trang chủ hoặc trang 'thank-you.html'
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Lỗi kết nối Server. Vui lòng thử lại!");
    }
  });
});

// Hàm tải giỏ hàng để hiển thị tóm tắt
async function loadCheckoutCart(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/${userId}`);
    const items = await response.json();

    const orderList = document.getElementById("order-items");
    const subTotalEl = document.getElementById("sub-total");
    const finalTotalEl = document.getElementById("final-total");
    const shippingFeeEl = document.getElementById("shipping-fee");

    let html = "";
    let subTotal = 0;

    items.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subTotal += itemTotal;

      // Render giao diện khớp với CSS .order-list
      html += `
                <div class="row" style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem;">
                    <span style="color: #666;">${
                      item.title
                    } <strong style="color: #333;">x${
        item.quantity
      }</strong></span>
                    <span>${itemTotal.toLocaleString("vi-VN")}₫</span>
                </div>
            `;
    });

    // Nếu không có sản phẩm
    if (items.length === 0) {
      orderList.innerHTML = "<p>Không có sản phẩm nào để thanh toán</p>";
      return;
    }

    orderList.innerHTML = html;

    // Tính toán tổng cộng
    // Lấy phí ship từ HTML (đang là 30.000₫) -> Chuyển về số
    let shippingFee = 30000;

    subTotalEl.innerText = subTotal.toLocaleString("vi-VN") + "₫";
    finalTotalEl.innerText =
      (subTotal + shippingFee).toLocaleString("vi-VN") + "₫";
  } catch (error) {
    console.error("Lỗi tải giỏ hàng checkout:", error);
  }
}
