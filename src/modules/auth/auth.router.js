import { Router } from "express";
import { register, verifyOTP, login } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
    registerLimiter,
    verifyLimiter,
    loginLimiter,
} from "../../middlewares/rateLimiter.js";
import { registerSchema, verifyOTPSchema, loginSchema } from "./auth.schema.js";

const router = Router();

// Register
router.post("/register", registerLimiter, validate(registerSchema), register);
router.post("/verify-otp", verifyLimiter, validate(verifyOTPSchema), verifyOTP);

// Login
router.post("/login", loginLimiter, validate(loginSchema), login);

export default router;
