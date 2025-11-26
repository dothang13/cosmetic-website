# 🌸 Cosmetic Store Website

![Project Banner](https://via.placeholder.com/1000x300?text=Cosmetic+Store+Banner)
> **Dự án nhóm 3 người** - Website bán mỹ phẩm với giao diện hiện đại, thân thiện người dùng và hệ thống quản trị trực quan.

[![Build Status](https://img.shields.io/badge/Status-Completed-success)]()
[![License](https://img.shields.io/badge/License-MIT-blue)]()

## 📑 Mục lục
- [Giới thiệu](#-giới-thiệu)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Chức năng chính](#-chức-năng-chính)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Cài đặt & Hướng dẫn sử dụng](#-cài-đặt--hướng-dẫn-sử-dụng)
- [Hình ảnh Demo](#-hình-ảnh-demo)
- [Thành viên nhóm](#-thành-viên-nhóm)

---

## 📌 Giới thiệu

Dự án xây dựng một website bán mỹ phẩm (E-commerce) phục vụ nhu cầu mua sắm trực tuyến. Hệ thống bao gồm các chức năng cốt lõi như xem sản phẩm, giỏ hàng, đặt hàng, quản lý tài khoản và trang Admin để quản trị dữ liệu.

Mục tiêu là tạo ra một sản phẩm **đơn giản, trực quan, dễ sử dụng**, phù hợp để báo cáo học phần hoặc làm đồ án môn học.

---

## 🛠 Công nghệ sử dụng

| Lĩnh vực | Công nghệ |
| :--- | :--- |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| **Backend** | *(Chọn 1 trong các mục sau)* ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) / ![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white) / ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=java&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) |
| **Design** | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white) |
| **Tools** | ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) |

---

## 🚀 Chức năng chính

### 🔹 1. Người dùng (Client)
- [x] Xem danh sách & Tìm kiếm sản phẩm
- [x] Lọc sản phẩm theo danh mục
- [x] Xem chi tiết sản phẩm
- [x] **Giỏ hàng:** Thêm/Sửa/Xóa sản phẩm
- [x] **Authentication:** Đăng ký / Đăng nhập
- [x] Thanh toán & Đặt hàng
- [x] Xem lịch sử đơn hàng

### 🔹 2. Quản trị viên (Admin)
- [x] **Dashboard:** Thống kê doanh thu, đơn hàng
- [x] Quản lý Sản phẩm (CRUD)
- [x] Quản lý Danh mục
- [x] Quản lý Đơn hàng (Duyệt/Hủy)
- [x] Quản lý Người dùng

---

## 📂 Cấu trúc thư mục

```text
/frontend
│
├── index.html              # Trang chủ
├── products.html           # Danh sách sản phẩm
├── product-detail.html     # Chi tiết sản phẩm
├── cart.html               # Giỏ hàng
├── checkout.html           # Thanh toán
├── login.html              # Đăng nhập
├── register.html           # Đăng ký
│
├── admin/                  # Khu vực quản trị
│   ├── admin-dashboard.html
│   ├── admin-products.html
│   ├── admin-orders.html
│   └── admin-users.html
│
├── assets/                 # Tài nguyên tĩnh
│   ├── css/                # Stylesheet (style.css, responsive.css)
│   ├── js/                 # Logic JS (main.js, cart.js, auth.js...)
│   └── images/             # Hình ảnh sản phẩm, banner
│
└── components/             # Các thành phần tái sử dụng
    ├── header.html
    ├── footer.html
    └── product-card.html
