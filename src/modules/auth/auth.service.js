import bcrypt from 'bcryptjs';
import User from '../../models/user.model.js';
import Otp from '../../models/otp.model.js';
import { generateOTP } from '../../utils/otp.js';
import { sendOTPEmail } from '../../utils/email.js';

export const registerService = async ({ name, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing && existing.isVerified) {
    throw { status: 409, message: 'Email đã được sử dụng.' };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  if (existing && !existing.isVerified) {
    await existing.update({ password: hashedPassword });
  } else {
    await User.create({ name, email, password: hashedPassword });
  }

  await Otp.destroy({ where: { email } });

  const code   = generateOTP();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 phút
  await Otp.create({ email, code, expiry });

  await sendOTPEmail(email, code);
};

export const verifyOTPService = async ({ email, otp }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw { status: 404, message: 'Người dùng không tồn tại.' };
  if (user.isVerified) throw { status: 400, message: 'Tài khoản đã được kích hoạt.' };

  const otpRecord = await Otp.findOne({ where: { email, isUsed: false } });
  if (!otpRecord) throw { status: 400, message: 'OTP không tồn tại.' };
  if (otpRecord.code !== otp) throw { status: 400, message: 'OTP không đúng.' };
  if (otpRecord.expiry < new Date()) throw { status: 400, message: 'OTP đã hết hạn.' };

  await user.update({ isVerified: true });
  await otpRecord.update({ isUsed: true });
};