import { Router } from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import { authenticate, authorize } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { updateProfileSchema } from "../auth/auth.schema.js";

const router = Router();

router.get("/profile", authenticate, authorize("user"), getProfile);
router.patch(
    "/profile",
    authenticate,
    authorize("user"),
    validate(updateProfileSchema),
    updateProfile,
);

export default router;
