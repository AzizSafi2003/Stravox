import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuthApi } from "../middleware/requireAuthApi";

const router = Router();

// GET /api/products => Get all products (public):
router.get("/", productController.getAllProducts);

/* GET /api/products/my - Get current user's products (Protected): */
router.get("/my", requireAuthApi, productController.getMyProducts);

/* GET /api/products/:id - Get single product by ID (Public): */
router.get("/:id", productController.getProductById);

/* POST /api/products - Create a new product (Protected): */
router.post("/", requireAuthApi, productController.createProduct);

/* PUT /api/products/:id - Update a product by ID (Protected): */
router.put("/:id", requireAuthApi, productController.updateProduct);

/* DELETE /api/products/:id - Delete a product by ID (Protected): */
router.delete("/:id", requireAuthApi, productController.deleteProduct);

export default router;
