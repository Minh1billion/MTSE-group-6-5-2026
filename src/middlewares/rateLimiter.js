import rateLimit from 'express-rate-limit';

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Quá nhiều yêu cầu, thử lại sau 15 phút.' },
});

export const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Quá nhiều yêu cầu, thử lại sau 15 phút.' },
});