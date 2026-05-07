import { registerService, verifyOTPService } from './auth.service.js';

export const register = async (req, res) => {
  try {
    await registerService(req.body);
    res.status(201).json({
      message: 'Đăng ký thành công! Kiểm tra email để lấy mã OTP.',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    await verifyOTPService(req.body);
    res.json({
      message: 'Tài khoản đã được kích hoạt thành công!',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};