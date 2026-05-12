import nodemailer from "nodemailer";

const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const mailHost = process.env.MAIL_HOST || "smtp.gmail.com";
const mailPort = Number(process.env.MAIL_PORT || 587);
const isMailConfigured = Boolean(mailUser && mailPass);

const transporter = isMailConfigured
    ? nodemailer.createTransport({
          host: mailHost,
          port: mailPort,
          secure: mailPort === 465,
          auth: {
              user: mailUser,
              pass: mailPass,
          },
      })
    : null;

const sendMailSafely = async (mailOptions, fallbackMessage) => {
    if (!transporter) {
        console.warn(fallbackMessage);
        return;
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.warn(fallbackMessage);
        console.warn(`Mail send failed: ${error.message}`);
        console.warn(`OTP for ${mailOptions.to}: ${mailOptions.html}`);
    }
};

export const sendOTPEmail = async (to, otp) => {
    await sendMailSafely(
        {
            from: `"Auth App" <${mailUser || "no-reply@example.com"}>`,
            to,
            subject: "Kích hoạt tài khoản của bạn",
            html: `
        <h2>Xác thực tài khoản</h2>
        <p>Mã OTP của bạn là: <b style="font-size:24px">${otp}</b></p>
        <p>Mã có hiệu lực trong <b>10 phút</b>.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
        `,
        },
        `Mail chưa được cấu hình hoặc đăng nhập SMTP thất bại, OTP kích hoạt của ${to} sẽ được ghi ra console.`,
    );
};

export const sendPasswordResetEmail = async (to, otp) => {
    await sendMailSafely(
        {
            from: `"Auth App" <${mailUser || "no-reply@example.com"}>`,
            to,
            subject: "OTP đặt lại mật khẩu",
            html: `
        <h2>Đặt lại mật khẩu</h2>
        <p>Mã OTP đặt lại mật khẩu của bạn là: <b style="font-size:24px">${otp}</b></p>
        <p>Mã có hiệu lực trong <b>10 phút</b>.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
        `,
        },
        `Mail chưa được cấu hình hoặc đăng nhập SMTP thất bại, OTP đặt lại mật khẩu của ${to} sẽ được ghi ra console.`,
    );
};