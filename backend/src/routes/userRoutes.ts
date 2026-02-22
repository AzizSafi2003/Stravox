import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuthApi } from "../middleware/requireAuthApi";

const router = Router();

// /api/users/sync - POST => sync the clerk user to DB (PROTECTED)

router.post("/sync", requireAuthApi, syncUser);

export default router;
