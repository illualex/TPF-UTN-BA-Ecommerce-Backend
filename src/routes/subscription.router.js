import express from "express";
import {
  createSubscriptionController,
  getAllSubscriptionsController,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = express.Router();

subscriptionRouter.post("/", createSubscriptionController);

subscriptionRouter.get("/", getAllSubscriptionsController);

export default subscriptionRouter;
