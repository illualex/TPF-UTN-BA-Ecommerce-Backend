import { Router } from "express";
import { getUserByEmailController } from "../controllers/user.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

router.get("/profile", authenticateJWT, getUserByEmailController);

export default router;
