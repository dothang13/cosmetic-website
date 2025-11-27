// 1. Lấy dữ liệu từ "Database"
const products = getAllProducts();

// 2. Chọn nơi để hiển thị
const productList = document.getElementById('product-list');

// 3. Duyệt qua từng sản phẩm và tạo HTML
// Mẹo: Dùng Template Literal (dấu ``) để viết HTML trong JS dễ hơn
let html = '';

products.forEach(product => {
    html += `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <span style="font-size: 0.8rem; color: #999;">${product.category}</span>
                <h3>${product.title}</h3>
                <span class="price">${product.price.toLocaleString('vi-VN')}₫</span>
                
                <a href="product-detail.html?id=${product.id}" class="btn">Xem chi tiết</a>
            </div>
        </div>
    `;
});

// 4. Gắn HTML đã tạo vào trang web
productList.innerHTML = html;