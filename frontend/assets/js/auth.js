// === LOGIC ĐĂNG KÝ & ĐĂNG NHẬP (Giả lập) ===

// 1. Xử lý Đăng nhập
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Chặn việc load lại trang

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Giả bộ kiểm tra (Sau này nối API Backend vào đây)
        if (email === "admin@gmail.com" && password === "123456") {
            alert("Đăng nhập quyền ADMIN thành công!");
            window.location.href = "admin/dashboard.html"; // 
        } else {
            alert("Đăng nhập thành công! Chào mừng bạn quay lại.");p
            localStorage.setItem('user_token', '123456789');
            window.location.href = "index.html"; // Chuyển về trang chủ
        }
    });
}

// 2. Xử lý Đăng ký
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('reg-password').value;
        const repass = document.getElementById('reg-repass').value;

        if (password !== repass) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        alert("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
        window.location.href = "login.html";
    });
}