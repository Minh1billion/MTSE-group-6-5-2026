import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import sequelize from "./config/db.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import adminRouter from "./modules/admin/admin.router.js";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";

const app = express();
app.use(express.json());

let server;

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
const start = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true });
        // Seed admin account if requested via environment variables
        const seedAdmin = async () => {
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPass = process.env.ADMIN_PASS;
            if (!adminEmail || !adminPass) return;

            let admin = await User.findOne({ where: { email: adminEmail } });
            const hashed = await bcrypt.hash(adminPass, 12);
            if (admin) {
                await admin.update({ role: "admin", password: hashed, isVerified: true });
                console.log(`Admin account updated: ${adminEmail}`);
            } else {
                await User.create({ name: "Administrator", email: adminEmail, password: hashed, role: "admin", isVerified: true });
                console.log(`Admin account created: ${adminEmail}`);
            }
        };

        await seedAdmin();
        console.log("Database synced");

        server = app.listen(process.env.PORT, () =>
            console.log(`Server running on port ${process.env.PORT}`),
        );

        server.on("error", (err) => {
            console.error("Server error:", err);
        });
    } catch (err) {
        console.error("Startup error:", err);
        process.exit(1);
    }
};

start();
