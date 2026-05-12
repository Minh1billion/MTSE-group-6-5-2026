import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk } from "../redux/slices/userSlice";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, loading, error } = useSelector((state) => state.user);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        dispatch(getProfileThunk());
    }, [isAuthenticated, dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-gray-500 text-lg">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Thông Tin Cá Nhân
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {profile && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                                {profile?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                    Họ tên
                                </span>
                                <span className="text-sm text-gray-800">
                                    {profile?.name}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                    Email
                                </span>
                                <span className="text-sm text-gray-800">
                                    {profile?.email}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                    Role
                                </span>
                                <span className="text-sm text-gray-800">
                                    {profile?.role}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default Profile;
