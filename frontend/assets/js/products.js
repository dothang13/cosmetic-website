// 1. Chọn nơi để hiển thị
const productList = document.getElementById("product-list");

// 2. Gọi API từ Backend (Thay thế cho getAllProducts)
const API_URL = "http://localhost:3000/api/products";

fetch(API_URL)
  .then((response) => response.json())
  .then((products) => {
    // --- Code hiển thị CHỈ chạy khi đã có dữ liệu từ Server ---

    console.log("Danh sách sản phẩm:", products); // Kiểm tra xem lấy được chưa

    let html = "";

    products.forEach((product) => {
      html += `
                <div class="product-card">
                    <div class="product-img">
                        <img src="${product.thumbnail}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <span style="font-size: 0.8rem; color: #999;">
                            ${product.category_name || "Đang cập nhật"}
                        </span>
                        
                        <h3>${product.title}</h3>
                        
                        <span class="price">
                            ${product.price.toLocaleString("vi-VN")}₫
                        </span>
                        
                        <a href="product-detail.html?id=${
                          product.id
                        }" class="btn">Xem chi tiết</a>
                    </div>
                </div>
            `;
    });

    // 3. Gắn HTML đã tạo vào trang web
    productList.innerHTML = html;

    // --- Kết thúc phần hiển thị ---
  })
  .catch((error) => {
    console.error("Lỗi tải sản phẩm:", error);
    productList.innerHTML =
      '<p style="text-align:center; color:red">Không thể tải danh sách sản phẩm!</p>';
  });
