// src/routes/subscription.routes.js
import express from "express";
import {
  createSubscriptionController,
  getAllSubscriptionsController,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = express.Router();

// Ruta para crear una nueva suscripción
subscriptionRouter.post("/", createSubscriptionController);

// Ruta para obtener todas las suscripciones
subscriptionRouter.get("/", getAllSubscriptionsController);

export default subscriptionRouter;
