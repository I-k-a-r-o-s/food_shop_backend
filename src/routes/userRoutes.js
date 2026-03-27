import { Router } from "express";
import { userLogin, userRegister } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);

export default userRouter;
