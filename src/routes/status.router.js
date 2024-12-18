import express from "express";
import { getPingController } from "../controllers/status.controller.js";
import { verifyApiKeyMiddleware, verifyTokenMiddleware } from "../middlewares/auth.middleware.js";

const statusRouter = express.Router();

// Verificación del API Key en todas las rutas
statusRouter.use(verifyApiKeyMiddleware);

// Ruta para hacer un ping público (sin autenticación)
statusRouter.get("/status/ping", getPingController);

// Ruta protegida para hacer un ping (requiere autenticación y rol)
statusRouter.get("/protected-route/ping", verifyTokenMiddleware(["admin", "user"]), getPingController);

export default statusRouter;
