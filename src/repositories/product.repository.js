import Product from "../models/product.model.js";

class ProductRepository {
  /**
   * Retrieves all products from the database
   * @returns {Promise<Product[]>} An array of all products
   */
  static async getAll() {
    try {
      return await Product.find({});
    } catch (error) {
      throw new Error("Error retrieving products: " + error.message);
    }
  }

  /**
   * Retrieves products by name using a case-insensitive partial match
   * @param {string} name - The name or part of the name to search for
   * @returns {Promise<Product[]>} An array of products matching the name
   */
  static async getByName(name) {
    try {
      const regex = new RegExp(name, "i"); // Case-insensitive search
      return await Product.find({
        name: { $regex: regex },
      });
    } catch (error) {
      throw new Error("Error searching products by name: " + error.message);
    }
  }
}

export default ProductRepository;
