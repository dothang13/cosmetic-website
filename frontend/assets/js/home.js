// Chọn nơi hiển thị trong HTML (Đưa ra ngoài để code gọn hơn)
const featuredContainer = document.getElementById("featured-products");
const API_URL = "http://localhost:3000/api/products";

// Gọi API từ Backend của bạn thay vì dùng getAllProducts()
fetch(API_URL)
  .then((response) => response.json()) // Chuyển dữ liệu nhận được thành JSON
  .then((allProducts) => {
    // --- Bắt đầu phần Logic hiển thị (Chỉ chạy khi đã có dữ liệu) ---

    console.log("Đã nhận được dữ liệu:", allProducts); // Kiểm tra trong Console

    // 1. Lấy 4 sản phẩm đầu tiên làm "Nổi bật"
    // Logic cũ của bạn: .slice(0, 4)
    const featuredProducts = allProducts.slice(0, 4);

    // 2. Tạo HTML và gắn vào
    let html = "";

    featuredProducts.forEach((product) => {
      // Lưu ý: Đảm bảo các tên biến (image, title, price) khớp với JSON từ Backend
      html += `
                <div class="product-card">
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <span style="font-size: 0.8rem; color: #999;">${
                          product.category
                        }</span>
                        <h3>${product.title}</h3>
                        <span class="price">${product.price.toLocaleString(
                          "vi-VN"
                        )}₫</span>
                        
                        <a href="product-detail.html?id=${
                          product.id
                        }" class="btn">Mua ngay</a>
                    </div>
                </div>
            `;
    });

    // 3. Đẩy HTML vào giao diện
    featuredContainer.innerHTML = html;

    // --- Kết thúc phần Logic hiển thị ---
  })
  .catch((error) => {
    console.error("Lỗi kết nối Server:", error);
    featuredContainer.innerHTML =
      '<p style="color:red; text-align:center;">Lỗi kết nối server. Vui lòng thử lại sau!</p>';
  });
