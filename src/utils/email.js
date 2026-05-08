import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendOTPEmail = async (to, otp) => {
    await transporter.sendMail({
        from: `"Auth App" <${process.env.MAIL_USER}>`,
        to,
        subject: 'Kích hoạt tài khoản của bạn',
        html: `
        <h2>Xác thực tài khoản</h2>
        <p>Mã OTP của bạn là: <b style="font-size:24px">${otp}</b></p>
        <p>Mã có hiệu lực trong <b>10 phút</b>.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
        `,
    });
};

export const sendPasswordResetEmail = async (to, otp) => {
    await transporter.sendMail({
        from: `"Auth App" <${process.env.MAIL_USER}>`,
        to,
        subject: 'OTP đặt lại mật khẩu',
        html: `
        <h2>Đặt lại mật khẩu</h2>
        <p>Mã OTP đặt lại mật khẩu của bạn là: <b style="font-size:24px">${otp}</b></p>
        <p>Mã có hiệu lực trong <b>10 phút</b>.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
        `,
    });
};