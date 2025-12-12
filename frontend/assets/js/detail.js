document.addEventListener("DOMContentLoaded", function () {
  // 1. Lấy ID từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const productDetailContainer = document.getElementById(
    "product-detail-container"
  );

  // Kiểm tra nếu thiếu ID hoặc thiếu thẻ container thì dừng lại để tránh lỗi
  if (!productId) {
    console.error("Thiếu ID sản phẩm trên URL");
    if (productDetailContainer)
      productDetailContainer.innerHTML =
        "<p>Không tìm thấy sản phẩm (Thiếu ID)</p>";
    return;
  }

  if (!productDetailContainer) {
    console.error(
      "Lỗi: Không tìm thấy thẻ có id='product-detail-container' trong HTML"
    );
    return;
  }

  // 2. Cấu hình API
  const API_PRODUCT_URL = `http://localhost:3000/api/products/${productId}`;
  const API_CART_ADD = `http://localhost:3000/api/cart/add`;

  // 3. Gọi API lấy dữ liệu
  fetch(API_PRODUCT_URL)
    .then((response) => {
      if (!response.ok)
        throw new Error("Lỗi kết nối Server hoặc không tìm thấy SP");
      return response.json();
    })
    .then((product) => {
      // --- Render HTML ---
      const html = `
          <div class="product-detail-img">
              <img src="${product.thumbnail}" alt="${
        product.title
      }" style="max-width: 100%; border-radius: 8px;">
          </div>
          <div class="product-detail-info">
              <span class="category-tag" style="color: #888; font-size: 0.9em;">${
                product.category_name || "Sản phẩm"
              }</span>
              <h1 style="margin: 10px 0;">${product.title}</h1>
              <p class="price" style="color: #ff99ac; font-size: 1.5rem; font-weight: bold;">${product.price.toLocaleString(
                "vi-VN"
              )}₫</p>
              <p class="desc" style="margin: 20px 0;">${
                product.description || "Chưa có mô tả."
              }</p>
              
              <div class="actions" style="margin-top: 30px;">
                  <input type="number" id="quantity" value="1" min="1" style="width: 60px; padding: 10px; margin-right: 10px;">
                  <button class="add-to-cart-btn btn" style="padding: 10px 20px; background: #ff99ac; color: white; border: none; cursor: pointer;">Thêm vào giỏ hàng</button>
              </div>
          </div>
      `;

      productDetailContainer.innerHTML = html;

      // --- Xử lý sự kiện Thêm vào giỏ ---
      const addToCartBtn = document.querySelector(".add-to-cart-btn");
      const quantityInput = document.getElementById("quantity");

      addToCartBtn.addEventListener("click", async function () {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));

        if (!userInfo) {
          if (
            confirm(
              "Bạn cần đăng nhập để mua hàng. Chuyển đến trang đăng nhập ngay?"
            )
          ) {
            window.location.href = "login.html";
          }
          return;
        }

        const quantity = parseInt(quantityInput.value) || 1;
        const payload = {
          user_id: userInfo.id,
          product_id: product.id,
          quantity: quantity,
        };

        try {
          const response = await fetch(API_CART_ADD, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            alert("✅ Đã thêm vào giỏ hàng thành công!");
          } else {
            const result = await response.json();
            alert("❌ Lỗi: " + (result.message || "Không thể thêm vào giỏ"));
          }
        } catch (error) {
          console.error(error);
          alert("❌ Lỗi kết nối đến Server!");
        }
      });
    })
    .catch((error) => {
      console.error("Lỗi tải chi tiết:", error);
      productDetailContainer.innerHTML = `<p style='text-align:center; color: red'>Không tải được sản phẩm. <br> ${error.message}</p>`;
    });
});
