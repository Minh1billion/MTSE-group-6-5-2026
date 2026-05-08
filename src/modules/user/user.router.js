import { Router } from "express";
import { getProfile } from "./user.controller.js";
import { authenticate, authorize } from "../../middlewares/authenticate.js";

const router = Router();

// GET /user/profile — chỉ user đã đăng nhập và có role 'user'
router.get("/profile", authenticate, authorize("user"), getProfile);

export default router;
