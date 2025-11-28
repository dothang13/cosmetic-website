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
                    <input type="number" value="1" min="1" style="padding: 10px; width: 60px; border: 1px solid #ddd; border-radius: 5px; margin-right: 10px;">
                    <button class="btn" onclick="addToCart(${
                      product.id
                    })">Thêm vào giỏ hàng</button>
                </div>
            </div>
            `;
    } else {
      detailContainer.innerHTML = `<h2>Không tìm thấy sản phẩm!</h2>`;
    }
  })
  .catch((error) => {
    console.error("Lỗi tải chi tiết sản phẩm:", error);
    detailContainer.innerHTML =
      '<p style="text-align:center; color:red">Không thể tải chi tiết sản phẩm!</p>';
  });

// Hàm giả lập thêm vào giỏ (Bạn có thể phát triển tiếp ở phần sau)
function addToCart(id) {
  alert("Đã thêm sản phẩm ID: " + id + " vào giỏ hàng!");
}
