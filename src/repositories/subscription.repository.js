// src/repositories/subscription.repository.js
import Subscription from "../models/subscription.model.js";

class SubscriptionRepository {
  // Crear una nueva suscripción
  static async createSubscription(email) {
    const subscription = new Subscription({ email });
    return await subscription.save();
  }

  // Verificar si un correo ya está suscrito
  static async findByEmail(email) {
    return await Subscription.findOne({ email });
  }

  // Listar todas las suscripciones
  static async getAllSubscriptions() {
    return await Subscription.find({});
  }

  // Eliminar una suscripción
  static async deleteSubscription(email) {
    return await Subscription.findOneAndDelete({ email });
  }
}

export default SubscriptionRepository;
