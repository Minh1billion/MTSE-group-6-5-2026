import { Router } from "express";
import {
    register,
    verifyOTP,
    login,
    requestPasswordReset,
    resetPassword,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
    registerLimiter,
    verifyLimiter,
    loginLimiter,
    forgotPasswordLimiter,
} from "../../middlewares/rateLimiter.js";
import {
    registerSchema,
    verifyOTPSchema,
    loginSchema,
    forgotPasswordRequestSchema,
    forgotPasswordResetSchema,
} from "./auth.schema.js";

const router = Router();

// Register
router.post("/register", registerLimiter, validate(registerSchema), register);
router.post("/verify-otp", verifyLimiter, validate(verifyOTPSchema), verifyOTP);

// Login
router.post("/login", loginLimiter, validate(loginSchema), login);

// Forgot password
router.post(
    "/forgot-password/request-otp",
    forgotPasswordLimiter,
    validate(forgotPasswordRequestSchema),
    requestPasswordReset,
);
router.post(
    "/forgot-password/reset",
    forgotPasswordLimiter,
    validate(forgotPasswordResetSchema),
    resetPassword,
);

export default router;
