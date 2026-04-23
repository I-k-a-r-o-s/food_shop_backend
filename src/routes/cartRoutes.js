import { Router } from "express";
import {
  addToCart,
  getCartData,
  removeFromCart,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const cartRouter = Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/get", authMiddleware, getCartData);

export default cartRouter;
