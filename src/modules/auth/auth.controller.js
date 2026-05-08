import {
    registerService,
    verifyOTPService,
    loginService,
    requestPasswordResetService,
    resetPasswordService,
} from "./auth.service.js";

// Register
export const register = async (req, res) => {
    try {
        await registerService(req.body);
        res.status(201).json({
            message: "Đăng ký thành công! Kiểm tra email để lấy mã OTP.",
        });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        await verifyOTPService(req.body);
        res.json({ message: "Tài khoản đã được kích hoạt thành công!" });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const result = await loginService(req.body);
        res.json({
            message: "Đăng nhập thành công!",
            ...result,
        });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const requestPasswordReset = async (req, res) => {
    try {
        await requestPasswordResetService(req.body);
        res.json({ message: "OTP đặt lại mật khẩu đã được gửi qua email." });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        await resetPasswordService(req.body);
        res.json({ message: "Đặt lại mật khẩu thành công!" });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};
