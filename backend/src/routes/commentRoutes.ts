import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController";

const router = Router();

/* POST /api/comments/:productId - Add comment to the product (Protected): */
router.post("/:productId", requireAuth(), commentController.createComment);

/* DELETE /api/comments/:commentId - Delete comment (Protected - Owner only): */
router.delete("/:commentId", requireAuth(), commentController.deleteComment);

export default router;
