import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "string.min": "Tên phải có ít nhất 2 ký tự",
        "string.max": "Tên không được quá 50 ký tự",
        "any.required": "Tên là bắt buộc",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
        "any.required": "Mật khẩu là bắt buộc",
    }),
});

export const verifyOTPSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
    }),
    otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
        "string.length": "OTP phải có đúng 6 số",
        "string.pattern": "OTP chỉ được chứa số",
        "any.required": "OTP là bắt buộc",
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
        "any.required": "Mật khẩu là bắt buộc",
    }),
});
