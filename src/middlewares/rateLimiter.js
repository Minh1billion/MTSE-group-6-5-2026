import rateLimit from "express-rate-limit";

// Register
export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Quá nhiều yêu cầu, thử lại sau 15 phút." },
});

export const verifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Quá nhiều yêu cầu, thử lại sau 15 phút." },
});

// Login
// Giới hạn chặt hơn để chống brute-force password
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: "Quá nhiều lần đăng nhập thất bại, thử lại sau 15 phút.",
    },
});
