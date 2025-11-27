// === LOGIC GIỎ HÀNG (Lưu trong LocalStorage) ===

// 1. Hàm khởi tạo giỏ hàng (chạy ngay khi load trang)
function initCart() {
    let cart = localStorage.getItem('shopping-cart');
    if (!cart) {
        // Nếu chưa có thì tạo mảng rỗng
        localStorage.setItem('shopping-cart', JSON.stringify([]));
    }
    updateCartCount();
}

// 2. Hàm thêm sản phẩm vào giỏ
function addToCart(productId) {
    // Lấy giỏ hàng hiện tại
    let cart = JSON.parse(localStorage.getItem('shopping-cart'));
    
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    let existingProduct = cart.find(item => item.id == productId);

    if (existingProduct) {
        // Nếu có rồi thì tăng số lượng
        existingProduct.quantity += 1;
    } else {
        // Nếu chưa có thì thêm mới (mặc định số lượng là 1)
        // Cần lấy thông tin sản phẩm từ db.js. 
        // Lưu ý: Vì main.js chạy sau db.js nên gọi được getAllProducts()
        let allProducts = getAllProducts(); 
        let product = allProducts.find(p => p.id == productId);
        
        if(product) {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
    }

    // Lưu ngược lại vào LocalStorage
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    
    // Cập nhật số lượng trên icon giỏ hàng và thông báo
    updateCartCount();
    alert("Đã thêm vào giỏ hàng thành công!");
}

// 3. Cập nhật số lượng trên icon Header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('shopping-cart')) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Tìm thẻ span số lượng trong header (bạn cần thêm class 'cart-count-badge' vào file html)
    let badge = document.querySelector('.cart-count');
    if (badge) {
        badge.innerText = totalCount;
    }
}

// Chạy hàm khởi tạo
initCart();