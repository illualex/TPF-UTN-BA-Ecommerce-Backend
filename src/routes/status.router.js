import express from "express";
import { getPingController } from "../controllers/status.controller.js";
import { verifyApiKeyMiddleware, verifyTokenMiddleware } from "../middlewares/auth.middleware.js";

const statusRouter = express.Router();

// Ruta para hacer un ping público (sin autenticación)
statusRouter.get("/ping", getPingController);

// Verificación del API Key en todas las rutas
statusRouter.use(verifyApiKeyMiddleware);

// Ruta protegida para hacer un ping (requiere autenticación y rol)
statusRouter.get("/protected-route/ping", verifyTokenMiddleware(["admin", "user"]), getPingController);

export default statusRouter;
