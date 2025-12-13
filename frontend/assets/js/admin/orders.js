// assets/js/admin/orders.js

const API_URL = "http://localhost:3000/api/orders";

document.addEventListener("DOMContentLoaded", function () {
  // 1. Kiểm tra quyền Admin
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  if (!userInfo || userInfo.role_id !== 1) {
    alert("Bạn không có quyền truy cập!");
    window.location.href = "../login.html";
    return;
  }

  // 2. Tải đơn hàng
  loadOrders();
});

async function loadOrders() {
  try {
    const response = await fetch(API_URL);
    const orders = await response.json();

    const tbody = document.getElementById("order-table-body");
    let html = "";

    if (orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center">Chưa có đơn hàng nào</td></tr>`;
      return;
    }

    orders.forEach((order) => {
      // Format ngày tháng (VD: 20/11/2024)
      const date = new Date(order.order_date).toLocaleDateString("vi-VN");

      // Format tiền
      const money = order.total_money.toLocaleString("vi-VN") + "₫";

      // Tạo Select Box cho trạng thái
      // Logic: Nếu order.status là 'pending' thì option pending sẽ có thuộc tính selected
      const statusSelect = `
                <select onchange="updateStatus(${
                  order.id
                }, this.value)" class="status-select ${order.status}">
                    <option value="pending" ${
                      order.status === "pending" ? "selected" : ""
                    }>Chờ xử lý</option>
                    <option value="processing" ${
                      order.status === "processing" ? "selected" : ""
                    }>Đang chuẩn bị</option>
                    <option value="shipped" ${
                      order.status === "shipped" ? "selected" : ""
                    }>Đang giao</option>
                    <option value="delivered" ${
                      order.status === "delivered" ? "selected" : ""
                    }>Đã giao</option>
                    <option value="cancelled" ${
                      order.status === "cancelled" ? "selected" : ""
                    }>Đã hủy</option>
                </select>
            `;

      html += `
                <tr>
                    <td>#ORD${order.id}</td>
                    <td>
                        <div>${order.fullname}</div>
                        <small style="color: #888;">${date}</small>
                    </td>
                    <td>${order.phone_number}</td>
                    <td style="font-weight: bold; color: var(--primary);">${money}</td>
                    <td>${statusSelect}</td>
                    <td>
                        <button onclick="viewOrderDetail(${order.id})" class="action-btn view" title="Xem chi tiết">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
    });

    tbody.innerHTML = html;
  } catch (error) {
    console.error("Lỗi tải đơn hàng:", error);
  }
}

// Hàm cập nhật trạng thái
async function updateStatus(orderId, newStatus) {
  if (
    !confirm(
      `Bạn có chắc muốn đổi trạng thái đơn #${orderId} thành "${newStatus}"?`
    )
  ) {
    loadOrders(); // Nếu hủy thì load lại để quay về trạng thái cũ
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      alert("Cập nhật trạng thái thành công!");
      loadOrders(); // Load lại để cập nhật màu sắc
    } else {
      alert("Lỗi cập nhật!");
    }
  } catch (error) {
    console.error(error);
    alert("Lỗi kết nối Server");
  }
}

// Hàm xem chi tiết (Sẽ phát triển sau)
function viewOrderDetail(id) {
  alert("Chức năng xem chi tiết đơn hàng #" + id + " đang phát triển!");
}
