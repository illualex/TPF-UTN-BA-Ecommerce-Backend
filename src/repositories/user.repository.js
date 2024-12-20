import User from "../models/user.model.js";

class UserRepository {
  /**
   * @param {string} id
   * @returns {Promise<User>}
   */
  static async getById(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }

  /**
   * @param {string} email
   * @returns {Promise<User>}
   */
  static async getByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  /**
   * @returns {Promise<User[]>}
   */
  static async getAll() {
    const users = await User.find({});
    return users;
  }

  /**
   *
   * @param {User} userData
   * @returns {Promise<User>}
   */
  static async saveUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  /**
   * @param {string} id
   * @param {Object} updates
   * @returns {Promise<User>}
   */
  static async updateById(id, updates) {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  }

  /**
  
   * @param {string} id 
   * @returns {Promise<void>} 
   */
  static async deleteById(id) {
    await User.findByIdAndDelete(id);
  }

  /**
   * @param {boolean} value
   * @param {string} user_id
   * @returns {Promise<User>}
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
