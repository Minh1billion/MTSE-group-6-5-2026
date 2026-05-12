import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";

export const getProfileService = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ["id", "name", "email", "role", "isVerified"],
    });

    if (!user) {
        throw { status: 404, message: "Người dùng không tồn tại." };
    }

    return user;
};

export const updateProfileService = async (userId, payload) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw { status: 404, message: "Người dùng không tồn tại." };
    }

    const { name, email, currentPassword, newPassword } = payload;

    if (email && email !== user.email) {
        const existed = await User.findOne({ where: { email } });
        if (existed && existed.id !== user.id) {
            throw { status: 409, message: "Email đã được sử dụng." };
        }
        user.email = email;
    }

    if (name) {
        user.name = name;
    }

    if (newPassword) {
        if (!currentPassword) {
            throw { status: 400, message: "Vui lòng nhập mật khẩu hiện tại." };
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw { status: 400, message: "Mật khẩu hiện tại không đúng." };
        }

        user.password = await bcrypt.hash(newPassword, 12);
    }

    await user.save();

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
    };
};