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

export const forgotPasswordRequestSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
    }),
});

export const forgotPasswordResetSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
    }),
    otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
        "string.length": "OTP phải có đúng 6 số",
        "string.pattern.base": "OTP chỉ được chứa số",
        "any.required": "OTP là bắt buộc",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
        "any.required": "Mật khẩu mới là bắt buộc",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Xác nhận mật khẩu không khớp",
        "any.required": "Xác nhận mật khẩu là bắt buộc",
    }),
});

export const updateProfileSchema = Joi.object({
    name: Joi.string().min(2).max(100).messages({
        "string.min": "Tên phải có ít nhất 2 ký tự",
        "string.max": "Tên không được quá 100 ký tự",
    }),
    email: Joi.string().email().messages({
        "string.email": "Email không hợp lệ",
    }),
    currentPassword: Joi.string().min(8).messages({
        "string.min": "Mật khẩu hiện tại phải có ít nhất 8 ký tự",
    }),
    newPassword: Joi.string().min(8).messages({
        "string.min": "Mật khẩu mới phải có ít nhất 8 ký tự",
    }),
    confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).messages({
        "any.only": "Xác nhận mật khẩu mới không khớp",
    }),
})
    .min(1)
    .with("newPassword", ["currentPassword", "confirmNewPassword"]);
