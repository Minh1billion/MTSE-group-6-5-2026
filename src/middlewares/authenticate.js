import jwt from "jsonwebtoken";

/**
 * Middleware xác thực JWT.
 * Gắn req.user = { id, email, role } nếu token hợp lệ.
 */
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Không có token xác thực." });
    }

    const token = authHeader.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        const message =
            err.name === "TokenExpiredError"
                ? "Token đã hết hạn."
                : "Token không hợp lệ.";
        return res.status(401).json({ message });
    }
};

/**
 * Middleware phân quyền theo role.
 * Dùng sau authenticate.
 */
export const authorize =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return res
                .status(403)
                .json({ message: "Bạn không có quyền truy cập." });
        }
        next();
    };
