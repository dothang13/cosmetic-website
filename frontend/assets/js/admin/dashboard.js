document.addEventListener("DOMContentLoaded", function () {
  // 1. Kiểm tra xem có phải Admin không?
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  if (!userInfo || userInfo.role_id !== 1) {
    // role_id 1 là Admin
    alert("Bạn không có quyền truy cập trang này!");
    window.location.href = "../login.html"; // Đá về trang login
    return;
  }

  // 2. Gọi API lấy dữ liệu
  fetchDashboardData();
});

async function fetchDashboardData() {
  try {
    const response = await fetch("http://localhost:3000/api/admin/dashboard");
    const data = await response.json();

    if (response.ok) {
      // A. Hiển thị Thống kê (Stats)
      document.getElementById("stat-orders").innerText = data.stats.totalOrders;
      // Format tiền Việt Nam: 53.000.000 -> 53M (Hoặc để nguyên số tùy bạn)
      document.getElementById("stat-revenue").innerText =
        data.stats.totalRevenue.toLocaleString("vi-VN") + "₫";
      document.getElementById("stat-customers").innerText =
        data.stats.totalCustomers;
      document.getElementById("stat-products").innerText =
        data.stats.totalProducts;

      // B. Hiển thị Bảng đơn hàng (Orders)
      renderRecentOrders(data.orders);
    }
  } catch (error) {
    console.error("Lỗi tải dashboard:", error);
  }
}

function renderRecentOrders(orders) {
  const tbody = document.getElementById("recent-orders-body");
  let html = "";

  orders.forEach((order) => {
    // Xử lý màu sắc trạng thái
    let statusClass = "";
    let statusText = "";
    switch (order.status) {
      case "delivered":
        statusClass = "delivered";
        statusText = "Đã giao";
        break;
      case "pending":
        statusClass = "pending";
        statusText = "Chờ xử lý";
        break;
      case "cancelled":
        statusClass = "cancelled";
        statusText = "Đã hủy";
        break;
      default:
        statusClass = "pending";
        statusText = order.status;
    }

    // Format ngày tháng
    const date = new Date(order.order_date).toLocaleDateString("vi-VN");

    html += `
            <tr>
                <td>#ORD${order.id}</td>
                <td>${order.fullname}</td>
                <td>${order.total_money.toLocaleString("vi-VN")}₫</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>${date}</td>
            </tr>
        `;
  });

  tbody.innerHTML = html;
}
