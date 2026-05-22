import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

//create user

router.post("/", userController.createUser);

export const userRoute = router;
