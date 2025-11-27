// 1. Lấy ID từ URL (Ví dụ: product-detail.html?id=2 => lấy số 2)
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// 2. Tìm sản phẩm trong "Database"
const product = getProductById(productId);

// 3. Chọn nơi hiển thị
const detailContainer = document.getElementById('product-detail');

// 4. Kiểm tra xem có tìm thấy sản phẩm không
if (product) {
    detailContainer.innerHTML = `
        <div class="detail-img">
            <img src="${product.image}" alt="${product.title}" style="border-radius: 10px;">
        </div>
        <div class="detail-text">
            <span style="color: #999; text-transform: uppercase; letter-spacing: 1px;">${product.category}</span>
            <h1>${product.title}</h1>
            <p class="price" style="font-size: 1.5rem;">${product.price.toLocaleString('vi-VN')}₫</p>
            <p class="detail-desc">${product.desc}</p>
            
            <div style="margin-top: 30px;">
                <input type="number" value="1" min="1" style="padding: 10px; width: 60px; border: 1px solid #ddd; border-radius: 5px; margin-right: 10px;">
                <button class="btn" onclick="addToCart(${product.id})">Thêm vào giỏ hàng</button>
            </div>
        </div>
    `;
} else {
    detailContainer.innerHTML = `<h2>Không tìm thấy sản phẩm!</h2>`;
}

// Hàm giả lập thêm vào giỏ (Bạn có thể phát triển tiếp ở phần sau)
function addToCart(id) {
    alert("Đã thêm sản phẩm ID: " + id + " vào giỏ hàng!");
}