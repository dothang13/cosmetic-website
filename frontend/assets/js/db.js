// Dữ liệu mẫu (Mô phỏng bảng 'products' trong MySQL)
const productsDB = [
    {
        id: 1,
        title: "Son Dưỡng Môi Hồng Hào",
        price: 150000,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=2030",
        category: "Son môi",
        desc: "Son dưỡng môi chiết xuất từ dâu tây giúp môi luôn mềm mượt, hồng hào tự nhiên."
    },
    {
        id: 2,
        title: "Kem Nền Che Khuyết Điểm",
        price: 320000,
        image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=2070",
        category: "Trang điểm mặt",
        desc: "Độ che phủ cao, mỏng nhẹ, không gây bí da, phù hợp cho da dầu."
    },
    {
        id: 3,
        title: "Phấn Má Hồng Baby",
        price: 180000,
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070",
        category: "Trang điểm mặt",
        desc: "Phấn má dạng nén với tông màu hồng baby ngọt ngào, lâu trôi."
    },
    {
        id: 4,
        title: "Nước Hoa Hồng Dịu Nhẹ",
        price: 250000,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887",
        category: "Chăm sóc da",
        desc: "Cân bằng độ pH cho da, se khít lỗ chân lông, không chứa cồn."
    }
];

// Hàm giả lập việc lấy tất cả sản phẩm (SELECT * FROM products)
function getAllProducts() {
    return productsDB;
}

// Hàm giả lập lấy 1 sản phẩm theo ID (SELECT * FROM products WHERE id = ...)
function getProductById(id) {
    return productsDB.find(product => product.id == id);
}