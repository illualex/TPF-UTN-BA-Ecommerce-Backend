// src/controllers/subscription.controller.js
import SubscriptionRepository from "../repositories/subscription.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";


export const createSubscriptionController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(
        responseBuilder(false, 400, "BAD_REQUEST", {
          detail: "Email is required for subscription",
        })
      );
    }

    // Verificar si el correo ya está suscrito
    const existingSubscription = await SubscriptionRepository.findByEmail(
      email
    );
    if (existingSubscription) {
      return res.status(409).json(
        responseBuilder(false, 409, "ALREADY_SUBSCRIBED", {
          detail: "This email is already subscribed",
        })
      );
    }

    // Crear la suscripción
    const newSubscription = await SubscriptionRepository.createSubscription(
      email
    );
    return res.status(201).json(
      responseBuilder(true, 201, "SUBSCRIPTION_CREATED", {
        subscription: newSubscription,
      })
    );
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        detail: "Failed to create subscription",
        error: err.message,
      })
    );
  }
};

export const getAllSubscriptionsController = async (req, res) => {
  try {
    const subscriptions = await SubscriptionRepository.getAllSubscriptions();
    return res.status(200).json(
      responseBuilder(true, 200, "SUCCESS", {
        subscriptions,
      })
    );
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        detail: "Failed to retrieve subscriptions",
      })
    );
  }
};
