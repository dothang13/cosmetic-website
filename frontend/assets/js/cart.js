document.addEventListener("DOMContentLoaded", function () {
  loadCart();
});

async function loadCart() {
  const cartTableBody = document.getElementById("cart-table-body");
  const cartTotalPrice = document.getElementById("cart-total-price");

  // 1. Kiểm tra đăng nhập
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  if (!userInfo) {
    cartTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px;">Vui lòng <a href="login.html">đăng nhập</a> để xem giỏ hàng!</td></tr>`;
    return;
  }

  // 2. Gọi API lấy giỏ hàng từ Database
  try {
    const userId = userInfo.id;
    const response = await fetch(`http://localhost:3000/api/cart/${userId}`);
    const cartItems = await response.json();

    // Kiểm tra nếu giỏ hàng trống
    if (cartItems.length === 0) {
      cartTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px;">Giỏ hàng của bạn đang trống. <a href="index.html">Mua sắm ngay</a></td></tr>`;
      cartTotalPrice.innerText = "0₫";
      return;
    }

    // 3. Render (Vẽ) danh sách sản phẩm ra HTML
    let html = "";
    let total = 0;

    cartItems.forEach((item) => {
      const subtotal = item.price * item.quantity; // Tính thành tiền của từng món
      total += subtotal; // Cộng dồn vào tổng tiền

      html += `
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="${item.thumbnail}" alt="${item.title}">
                        <div>
                            <p>${item.title}</p>
                            <small>Giá: ${item.price.toLocaleString(
                              "vi-VN"
                            )}₫</small>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="number" value="${
                      item.quantity
                    }" min="1" disabled style="width: 50px; text-align: center;">
                </td>
                <td>${subtotal.toLocaleString("vi-VN")}₫</td>
                <td>
                    <a href="#" class="remove-btn" onclick="removeCartItem(${
                      item.id
                    })">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </td>
            </tr>
        `;
    });

    // 4. Gắn HTML vào bảng và cập nhật tổng tiền
    cartTableBody.innerHTML = html;
    cartTotalPrice.innerText = total.toLocaleString("vi-VN") + "₫";
  } catch (error) {
    console.error("Lỗi tải giỏ hàng:", error);
    cartTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: red;">Lỗi kết nối Server!</td></tr>`;
  }
}

// Hàm xóa sản phẩm (Tạm thời chỉ thông báo, cần viết API xóa sau)
function removeCartItem(userId, productId) {
  if (confirm("Bạn có muốn xóa sản phẩm này?")) {
    alert("Chức năng xóa cần viết thêm API DELETE ở Backend!");
    // Sau này sẽ gọi: fetch(`/api/cart/remove`, { method: 'DELETE' ... })
  }
}
// Hàm xóa sản phẩm
async function removeCartItem(productId) {
  // 1. Hỏi người dùng cho chắc ăn
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    return;
  }

  // 2. Lấy User ID
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  if (!userInfo) return;

  // 3. Gọi API Xóa
  try {
    const response = await fetch("http://localhost:3000/api/cart/remove", {
      method: "DELETE", // Quan trọng: Phương thức DELETE
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userInfo.id,
        product_id: productId,
      }),
    });

    if (response.ok) {
      alert("Đã xóa thành công!");
      loadCart(); // Gọi lại hàm loadCart để tải lại bảng (không cần F5 trang)
    } else {
      alert("Lỗi khi xóa sản phẩm.");
    }
  } catch (error) {
    console.error("Lỗi kết nối:", error);
    alert("Không kết nối được Server.");
  }
}
