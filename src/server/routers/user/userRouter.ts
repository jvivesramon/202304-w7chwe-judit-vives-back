import { Router } from "express";
import loginUserController from "../../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/login", loginUserController);

export default userRouter;
