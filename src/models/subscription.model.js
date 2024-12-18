// src/models/subscription.model.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Para evitar duplicados
    match: [/.+\@.+\..+/, "Please fill a valid email address"], // Validación básica
  },
  subscribedAt: {
    type: Date,
    default: Date.now, // Fecha de suscripción
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
