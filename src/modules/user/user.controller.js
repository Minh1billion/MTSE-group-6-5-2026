import User from "../../models/user.model.js";

/**
 * GET /user/profile
 * Trả về thông tin cá nhân của user đang đăng nhập.
 * req.user được gắn bởi middleware authenticate.
 */
export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "name", "email", "isVerified", "createdAt"],
        });

        if (!user)
            return res
                .status(404)
                .json({ message: "Người dùng không tồn tại." });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
