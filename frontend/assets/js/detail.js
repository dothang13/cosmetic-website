// 1. Lấy ID từ URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// 2. Chọn nơi hiển thị
const detailContainer = document.getElementById("product-detail");

// 3. Gọi API từ Backend để lấy chi tiết sản phẩm
const API_URL = `http://localhost:3000/api/products/${productId}`;

fetch(API_URL)
  .then((response) => response.json())
  .then((product) => {
    // --- Code hiển thị CHỈ chạy khi đã có dữ liệu từ Server ---
    console.log("Chi tiết sản phẩm:", product); // Kiểm tra xem lấy được chưa
    if (product) {
      detailContainer.innerHTML = `
            <div class="detail-img">
                <img src="${product.thumbnail}" alt="${
        product.title
      }" style="border-radius: 10px;">
            </div>
            <div class="detail-text">
                <span style="color: #999; text-transform: uppercase; letter-spacing: 1px;">${
                  product.category_name
                }</span>
                <h1>${product.title}</h1>
                <p class="price" style="font-size: 1.5rem;">${product.price.toLocaleString(
                  "vi-VN"
                )}₫</p>
                <p class="detail-desc">${product.description}</p>
                
                <div style="margin-top: 30px;">
                    <input type="number" id="quantity" value="1" min="1" style="padding: 10px; width: 60px; border: 1px solid #ddd; border-radius: 5px; margin-right: 10px;">
                    <button id="add-to-cart-btn" class="btn" onclick="addToCart(${
                      product.id
                    })">Thêm vào giỏ hàng</button>
                </div>
            </div>
            `;

      // --- PHẦN MỚI: XỬ LÝ THÊM VÀO GIỎ HÀNG ---

      // 2. Tìm nút "Thêm vào giỏ hàng" và ô số lượng vừa tạo
      const addToCartBtn = document.getElementById("add-to-cart-btn");
      const quantityInput = document.getElementById("quantity");

      addToCartBtn.addEventListener("click", function () {
        // BƯỚC A: Kiểm tra đăng nhập
        const userInfo = JSON.parse(localStorage.getItem("user_info"));

        if (!userInfo) {
          alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
          window.location.href = "login.html"; // Chuyển hướng sang trang đăng nhập
          return; // Dừng lại, không chạy code bên dưới nữa
        }

        // BƯỚC B: Lấy số lượng khách muốn mua
        const quantity = parseInt(quantityInput.value) || 1;

        // BƯỚC C: Thêm vào LocalStorage
        addToCart(product, quantity);
      });
    } else {
      detailContainer.innerHTML = `<h2>Không tìm thấy sản phẩm!</h2>`;
    }
  })
  .catch((error) => {
    console.error("Lỗi tải chi tiết sản phẩm:", error);
    detailContainer.innerHTML =
      '<p style="text-align:center; color:red">Không thể tải chi tiết sản phẩm!</p>';
  });

// --- HÀM HỖ TRỢ: Thêm vào giỏ hàng ---
function addToCart(product, quantity) {
  // 1. Lấy giỏ hàng hiện tại từ LocalStorage (Nếu chưa có thì tạo mảng rỗng)
  let cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];

  // 2. Kiểm tra xem sản phẩm này đã có trong giỏ chưa
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex > -1) {
    // Nếu có rồi -> Cộng dồn số lượng
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Nếu chưa có -> Thêm mới vào mảng
    // Chỉ lưu những thông tin cần thiết
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: quantity,
    });
  }

  // 3. Lưu ngược lại vào LocalStorage
  localStorage.setItem("shopping_cart", JSON.stringify(cart));

  // 4. Thông báo và cập nhật icon giỏ hàng (nếu file main.js đã chạy)
  alert(`Đã thêm sản phẩm vào giỏ hàng!`);

  if (typeof updateCartCount === "function") {
    updateCartCount(); // Gọi hàm cập nhật số trên icon (trong main.js)
  }
}
