import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js"
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cartController.js";

const router = express.Router()

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.patch("/:id", protectRoute, updateQuantity);

export default router;