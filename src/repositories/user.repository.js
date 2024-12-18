import User from "../models/user.model.js";

class UserRepository {
  /**
   * Retrieves a user by their id
   * @param {string} id - User identifier
   * @returns {Promise<User>} The user with the given id
   */
  static async getById(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }

  /**
   * Retrieves a user by their email
   * @param {string} email - User email
   * @returns {Promise<User>} The user with the given email
   */
  static async getByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  /**
   * Retrieves all users
   * @returns {Promise<User[]>} A list of all users
   */
  static async getAll() {
    const users = await User.find({});
    return users;
  }

  /**
   * Saves a new or existing user
   * @param {User} userData - The user to be saved
   * @returns {Promise<User>} The saved user
   */
  static async saveUser(userData) {
    const user = new User(userData); // Crear una instancia del modelo User
    return await user.save();
  }

  /**
   * Updates a user by their id
   * @param {string} id - User identifier
   * @param {Object} updates - Fields to update
   * @returns {Promise<User>} The updated user
   */
  static async updateById(id, updates) {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true, // Retorna el documento actualizado
      runValidators: true, // Aplica las validaciones del esquema
    });
    return updatedUser;
  }

  /**
   * Deletes a user by their id
   * @param {string} id - User identifier
   * @returns {Promise<void>} A promise that resolves when the user is deleted
   */
  static async deleteById(id) {
    await User.findByIdAndDelete(id);
  }

  /**
   * Sets the email verification status for a user
   * @param {boolean} value - Verification status
   * @param {string} user_id - User identifier
   * @returns {Promise<User>} The updated user
   */
  static async setEmailVerified(value, user_id) {
    const user = await UserRepository.getById(user_id);
    if (user) {
      user.emailVerified = value;
      return await UserRepository.saveUser(user);
    }
    throw new Error("User not found");
  }
}

export default UserRepository;
