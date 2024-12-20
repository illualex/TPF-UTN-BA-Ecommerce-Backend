import express from "express";
import { getPingController } from "../controllers/status.controller.js";
import {
  verifyApiKeyMiddleware,
  verifyTokenMiddleware,
} from "../middlewares/auth.middleware.js";

const statusRouter = express.Router();

statusRouter.get("/ping", getPingController);

statusRouter.use(verifyApiKeyMiddleware);

statusRouter.get(
  "/protected-route/ping",
  verifyTokenMiddleware(["admin", "user"]),
  getPingController
);

export default statusRouter;
