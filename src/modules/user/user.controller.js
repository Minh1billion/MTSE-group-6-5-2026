import { getProfileService, updateProfileService } from "./user.service.js";

export const getProfile = async (req, res) => {
    try {
        const user = await getProfileService(req.user.id);
        res.json({ user });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user = await updateProfileService(req.user.id, req.body);
        res.json({
            message: "Cập nhật hồ sơ thành công!",
            user,
        });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};
