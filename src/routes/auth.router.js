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

router.post("/login", loginController); // Inicio de sesión

router.post("/register", createUserController); // Registro de usuarios

// Ruta para solicitar restablecimiento de contraseña
router.post("/forgot-password", forgotPasswordController);

// Ruta para restablecer la contraseña con el token
router.post("/reset-password/:reset_token", resetPasswordController);

export default router;
