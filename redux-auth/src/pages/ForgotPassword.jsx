import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    requestPasswordResetThunk,
    resetPasswordThunk,
} from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        const res = await dispatch(requestPasswordResetThunk({ email }));
        if (res.meta.requestStatus === "fulfilled") {
            setStep(2);
            setSuccess(false);
            setError(null);
        } else {
            setError(res.payload || "Email không tồn tại trong hệ thống!");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        const res = await dispatch(
            resetPasswordThunk({
                email,
                otp,
                password,
                confirmPassword,
            }),
        );

        if (res.meta.requestStatus === "fulfilled") {
            setSuccess(true);
            setError(null);
            navigate("/login");
        } else {
            setError(res.payload || "Đặt lại mật khẩu thất bại");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    {step === 1 ? "Quên Mật Khẩu" : "Đặt Lại Mật Khẩu"}
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    {step === 1
                        ? "Nhập email của bạn, chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu"
                        : "Nhập OTP và mật khẩu mới để hoàn tất quá trình đặt lại"}
                </p>

                {success && (
                    <div className="bg-green-100 text-green-600 px-4 py-2 rounded mb-4 text-sm">
                        Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleRequestOtp} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="example@email.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Đang gửi..." : "Gửi mã OTP"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                OTP
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mã 6 số"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Xác nhận mật khẩu mới
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                        </button>
                    </form>
                )}

                <p className="text-center text-sm text-gray-500 mt-4">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        ← Quay lại đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
