import { Router } from "express";
import upload from "../middleware/multer.js";
import { addFood } from "../controllers/foodController.js";

const foodRouter = Router();

foodRouter.post("/add",upload.single("image"), addFood);

export default foodRouter