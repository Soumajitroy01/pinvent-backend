import express from "express";
const router = express.Router();
import protect from "../middleWare/authMiddleware.js";
import {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
} from "../controllers/productController.js";
import { upload } from "../utils/fileUpload.js";

router.post("/", protect, upload.single("image"), createProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.delete("/:id", protect, deleteProduct);

export default router;