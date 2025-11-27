// 1. Lấy dữ liệu từ LocalStorage
let cart = JSON.parse(localStorage.getItem('shopping-cart')) || [];
const cartBody = document.getElementById('cart-body');
const totalPriceElement = document.getElementById('total-price');

// 2. Hàm render (hiển thị) giỏ hàng ra bảng
function renderCart() {
    cartBody.innerHTML = ''; // Xóa trắng trước khi render lại
    let totalMoney = 0;

    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 30px;">Giỏ hàng trống! <a href="products.html">Mua ngay</a></td></tr>';
        totalPriceElement.innerText = '0₫';
        return;
    }

    cart.forEach((item, index) => {
        let money = item.price * item.quantity;
        totalMoney += money;

        cartBody.innerHTML += `
            <tr>
                <td style="display: flex; align-items: center; gap: 15px; text-align: left;">
                    <img src="${item.image}" width="60" style="border-radius: 5px;">
                    <span>${item.title}</span>
                </td>
                <td>${item.price.toLocaleString('vi-VN')}₫</td>
                <td>
                    <div class="qty-box">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </td>
                <td style="font-weight: 600;">${money.toLocaleString('vi-VN')}₫</td>
                <td>
                    <button onclick="removeItem(${index})" style="background: none; border: none; color: red; cursor: pointer;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    totalPriceElement.innerText = totalMoney.toLocaleString('vi-VN') + '₫';
}

// 3. Hàm cập nhật số lượng (tăng/giảm)
function updateQuantity(index, change) {
    if (cart[index].quantity === 1 && change === -1) {
        // Nếu số lượng là 1 mà giảm nữa thì hỏi xem có muốn xóa không
        let confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không?");
        if (confirmDelete) {
            removeItem(index);
        }
        return;
    }

    cart[index].quantity += change;
    saveAndRender();
}

// 4. Hàm xóa sản phẩm
function removeItem(index) {
    cart.splice(index, 1); // Xóa 1 phần tử tại vị trí index
    saveAndRender();
}

// 5. Hàm lưu lại và vẽ lại giao diện
function saveAndRender() {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    updateCartCount(); // Gọi hàm bên main.js để cập nhật số trên header
    renderCart();
}

// Chạy hàm lần đầu
renderCart();