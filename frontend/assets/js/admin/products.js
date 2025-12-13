// assets/js/admin/products.js

const API_URL = "http://localhost:3000/api/products";

document.addEventListener("DOMContentLoaded", function () {
  // 1. Kiểm tra quyền Admin (Copy từ dashboard qua cho an toàn)
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  if (!userInfo || userInfo.role_id !== 1) {
    alert("Bạn không có quyền truy cập!");
    window.location.href = "../login.html";
    return;
  }

  // 2. Tải danh sách sản phẩm
  loadProducts();
});

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();

    const tbody = document.getElementById("product-table-body");
    let html = "";

    if (products.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center">Chưa có sản phẩm nào</td></tr>`;
      return;
    }

    products.forEach((product) => {
      // Format giá tiền
      const price = product.price.toLocaleString("vi-VN") + "₫";

      html += `
                <tr>
                    <td>#${product.id}</td>
                    <td>
                        <img src="${product.thumbnail}" alt="${
        product.title
      }" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                    </td>
                    <td style="font-weight: 500;">${product.title}</td>
                    <td style="color: var(--primary);">${price}</td>
                    <td><span class="category-badge">${
                      product.category_name || "Chưa phân loại"
                    }</span></td>
                    <td>
                        <button onclick="editProduct(${
                          product.id
                        })" class="action-btn edit" title="Sửa">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onclick="deleteProduct(${
                          product.id
                        })" class="action-btn delete" title="Xóa">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
    });

    tbody.innerHTML = html;
  } catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
  }
}

// Hàm Xóa sản phẩm
async function deleteProduct(id) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Đã xóa sản phẩm!");
        loadProducts(); // Tải lại bảng
      } else {
        alert("Lỗi khi xóa sản phẩm");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối Server");
    }
  }
}

// Hàm chuyển hướng sang trang sửa (Sẽ làm sau)
function editProduct(id) {
  alert("Chức năng sửa sản phẩm ID: " + id + " đang phát triển!");
  // window.location.href = `product-form.html?id=${id}`;
}
