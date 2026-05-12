import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ message: "Admin router is ready." });
});

export default router;
