// 1. Lấy tất cả sản phẩm từ db.js
const allProducts = getAllProducts();

// 2. Lấy 4 sản phẩm đầu tiên làm "Nổi bật"
// .slice(0, 4) nghĩa là cắt từ phần tử số 0 đến số 4
const featuredProducts = allProducts.slice(0, 4); 

// 3. Chọn nơi hiển thị trong HTML
const featuredContainer = document.getElementById('featured-products');

// 4. Tạo HTML và gắn vào
let html = '';

featuredProducts.forEach(product => {
    html += `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <span style="font-size: 0.8rem; color: #999;">${product.category}</span>
                <h3>${product.title}</h3>
                <span class="price">${product.price.toLocaleString('vi-VN')}₫</span>
                
                <a href="product-detail.html?id=${product.id}" class="btn">Mua ngay</a>
            </div>
        </div>
    `;
});

featuredContainer.innerHTML = html;