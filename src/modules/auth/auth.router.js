import { Router } from 'express';
import { register, verifyOTP } from './auth.controller.js';
import { validate } from '../../middlewares/validate.js';
import { registerLimiter, verifyLimiter } from '../../middlewares/rateLimiter.js';
import { registerSchema, verifyOTPSchema } from './auth.schema.js';

const router = Router();

router.post('/register', registerLimiter, validate(registerSchema), register);
router.post('/verify-otp', verifyLimiter, validate(verifyOTPSchema), verifyOTP);

export default router;