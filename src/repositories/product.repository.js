import Product from "../models/product.model.js";

class ProductRepository {
  /**
   * @returns {Promise<Product[]>}
   */
  static async getAll() {
    try {
      return await Product.find({});
    } catch (error) {
      throw new Error("Error retrieving products: " + error.message);
    }
  }

  /**
   * @param {string} name
   * @returns {Promise<Product[]>}
   */
  static async getByName(name) {
    try {
      const regex = new RegExp(name, "i");
      return await Product.find({
        name: { $regex: regex },
      });
    } catch (error) {
      throw new Error("Error searching products by name: " + error.message);
    }
  }
}

export default ProductRepository;
