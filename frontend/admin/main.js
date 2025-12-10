// === QUẢN LÝ SẢN PHẨM ===
const productTableBody = document.getElementById('product-table-body');

if (productTableBody) {
    // Lấy dữ liệu từ hàm getAllProducts() trong file db.js
    // Lưu ý: db.js phải được nhúng trước file này trong HTML
    const products = typeof getAllProducts === 'function' ? getAllProducts() : [];

    let html = '';
    products.forEach(p => {
        html += `
            <tr>
                <td>#${p.id}</td>
                <td><img src="${p.image}" alt=""></td>
                <td style="font-weight: 600;">${p.title}</td>
                <td>${p.price.toLocaleString('vi-VN')}₫</td>
                <td>${p.category}</td>
                <td>
                    <button class="action-btn edit" onclick="alert('Sửa SP: ${p.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="action-btn delete" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
    productTableBody.innerHTML = html;
}

function deleteProduct(id) {
    if(confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        alert('Đã xóa thành công sản phẩm ID: ' + id);
        // Trong thực tế, gọi API xóa. Ở đây chỉ ẩn dòng đó đi cho giống thật
        event.target.closest('tr').remove(); 
    }
}

// === QUẢN LÝ ĐƠN HÀNG (Giả lập dữ liệu vì chưa có DB thật) ===
const orderTableBody = document.getElementById('order-table-body');

if (orderTableBody) {
    // Dữ liệu mẫu
    const mockOrders = [
        { id: 'ORD001', customer: 'Nguyễn Văn A', phone: '0905123456', total: 350000, status: 'delivered', statusText: 'Đã giao' },
        { id: 'ORD002', customer: 'Trần Thị B', phone: '0912345678', total: 1250000, status: 'pending', statusText: 'Chờ xử lý' },
        { id: 'ORD003', customer: 'Lê Văn C', phone: '0987654321', total: 500000, status: 'cancelled', statusText: 'Đã hủy' },
        { id: 'ORD004', customer: 'Phạm Thị D', phone: '0909090909', total: 180000, status: 'pending', statusText: 'Chờ xử lý' },
    ];

    let orderHtml = '';
    mockOrders.forEach(order => {
        orderHtml += `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.phone}</td>
                <td>${order.total.toLocaleString('vi-VN')}₫</td>
                <td><span class="status ${order.status}">${order.statusText}</span></td>
                <td>
                    <button class="action-btn edit" title="Xem chi tiết"><i class="fa-solid fa-eye"></i></button>
                </td>
            </tr>
        `;
    });
    orderTableBody.innerHTML = orderHtml;
}