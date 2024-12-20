import Subscription from "../models/subscription.model.js";

class SubscriptionRepository {
  static async createSubscription(email) {
    const subscription = new Subscription({ email });
    return await subscription.save();
  }

  static async findByEmail(email) {
    return await Subscription.findOne({ email });
  }

  static async getAllSubscriptions() {
    return await Subscription.find({});
  }

  static async deleteSubscription(email) {
    return await Subscription.findOneAndDelete({ email });
  }
}

export default SubscriptionRepository;
