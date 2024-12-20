import { Router } from "express";
import {
  forgotPasswordController,
  resetPasswordController,
  verifyMailValidationTokenController,
  createUserController,
  loginController,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/verify/:verification_token", verifyMailValidationTokenController);

router.post("/login", loginController);

router.post("/register", createUserController);

router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password/:reset_token", resetPasswordController);

export default router;
