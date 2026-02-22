import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products => Get all products (public):
router.get("/", productController.getAllProducts);

/* GET /api/products/my - Get current user's products (Protected): */
router.get("/my", requireAuth(), productController.getMyProducts); // ← Move UP!

/* GET /api/products/:id - Get single product by ID (Public): */
router.get("/:id", productController.getProductById); // ← Move DOWN!

/* POST /api/products - Create a new product (Protected): */
router.post("/", requireAuth(), productController.createProduct);

/* PUT /api/products/:id - Update a product by ID (Protected): */
router.put("/:id", requireAuth(), productController.updateProduct);

/* DELETE /api/products/:id - Delete a product by ID (Protected): */
router.delete("/:id", requireAuth(), productController.deleteProduct);

export default router;
