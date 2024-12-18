import ProductRepository from "../repositories/product.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";
import { validateFormController } from "./errors.controller.js";
import ENV from "../config/enviroment.config.js";
import jwt from "jsonwebtoken";

export const getAllProductsController = async (req, res) => {
  try {
    const products = await ProductRepository.getAll();

    console.log("products", products);
    if (products.length === 0) {
      return res.status(400).json(
        responseBuilder(false, 400, "BAD_REQUEST", {
          detail: "No products found",
        })
      );
    }

    return res.status(200).json(
      responseBuilder(true, 200, "SUCCESS", {
        products,
      })
    );
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        detail: "Failed to get all the products",
        error: err.message,
      })
    );
  }
};

export const getProductByNameController = async (req, res) => {
  try {
    const { name } = req.query; // Obtenemos el 'name' desde la query (ej. /search?name=placa)
    console.log("name from query:", name);
    if (!name) {
      return res.status(400).json(
        responseBuilder(false, 400, "BAD_REQUEST", {
          detail: "Product name is required for this request",
        })
      );
    }

    // Realizamos la búsqueda por nombre con una expresión regular para que sea insensible a mayúsculas y minúsculas
    const regex = new RegExp(name, "i"); // 'i' para hacer que la búsqueda no distinga entre mayúsculas y minúsculas

    // Buscamos productos cuyo nombre contenga la cadena dada (parcialmente)
    const products = await ProductRepository.getByName(regex);
    console.log("Productos encontrados:", products);
    
    if (products.length === 0) {
      return res.status(404).json(
        responseBuilder(false, 404, "NOT_FOUND", {
          detail: "No products found with the provided name",
        })
      );
    }

    return res
      .status(200)
      .json(responseBuilder(true, 200, "SUCCESS", { products }));
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        detail: "Failed to get products by name",
        error: err.message,
      })
    );
  }
};

/* export const createProductController = async (req, res) => {
  try {
    const { name, description, price, stock, category, image_base_64 } =
      req.body;

    // Decodificar el JWT para obtener el id del vendedor
    const decoded = jwt.verify(req.headers["authorization"], ENV.JWT_SECRET);
    const seller_id = decoded.id;

    if (!seller_id) {
      return res
        .status(401)
        .json(
          responseBuilder(false, 401, "UNAUTHORIZED", {
            detail: "Seller ID is required",
          })
        );
    }

    // Validar el tamaño de la imagen
    if (
      image_base_64 &&
      Buffer.byteLength(image_base_64, "base64") > 4 * 1024 * 1024
    ) {
      return res
        .status(413)
        .json(
          responseBuilder(false, 413, "DATA_VALIDATION_ERRORS", {
            errors: "Image size must be less than 4MB",
          })
        );
    }

    const new_product = {
      name,
      description,
      price,
      stock,
      category,
      image_base_64,
      seller_id,
    };

    const errors = validateFormController(new_product);

    // Si hay errores de validación, devolvemos los mensajes correspondientes
    if (Object.entries(errors).length) {
      const messages = [];
      for (const key in errors) {
        if (errors[key].id === 11) {
          messages.push(errors[key].message + ": " + key);
        } else {
          messages.push(errors[key].message);
        }
      }
      return res
        .status(400)
        .json(
          responseBuilder(false, 400, "DATA_VALIDATION_ERRORS", {
            errors: messages,
          })
        );
    }

    const created_product = await ProductRepository.createProduct(new_product);
    return res
      .status(200)
      .json(responseBuilder(true, 200, "SUCCESS", { created_product }));
  } catch (err) {
    res
      .status(500)
      .json(
        responseBuilder(false, 500, "SERVER_ERROR", {
          detail: "Failed to create the product",
          error: err.message,
        })
      );
  }
}; */

/* export const updateProductByIdController = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = req.body;
    const decoded = jwt.verify(req.headers["authorization"], ENV.JWT_SECRET);
    const current_seller_id = decoded.id;

    const existing_product = await ProductRepository.getById(product_id);

    if (current_seller_id !== existing_product.seller_id.toString()) {
      return res
        .status(403)
        .json(
          responseBuilder(false, 403, "WRONG_ID_AUTHENTICATION", {
            detail:
              "The seller is not the same as the one who created the product",
          })
        );
    }

    const updated_product = await ProductRepository.updateProductById(
      product_id,
      product
    );

    return res
      .status(200)
      .json(
        responseBuilder(true, 200, "SUCCESS", { product: updated_product })
      );
  } catch (err) {
    res
      .status(500)
      .json(
        responseBuilder(false, 500, "SERVER_ERROR", {
          detail: "Failed to update the product",
          error: err.message,
        })
      );
  }
}; */

/* export const deleteProductController = async (req, res) => {
  try {
    const { product_id } = req.params;
    const decoded = jwt.verify(req.headers["authorization"], ENV.JWT_SECRET);
    const current_seller_id = decoded.id;

    const existing_product = await ProductRepository.getById(product_id);

    if (
      req.user.role === "admin" &&
      current_seller_id !== existing_product.seller_id.toString()
    ) {
      return res
        .status(403)
        .json(
          responseBuilder(false, 403, "WRONG_ID_AUTHENTICATION", {
            detail:
              "The seller is not the same as the one who created the product",
          })
        );
    }

    const product = await ProductRepository.deleteProductById(product_id);
    return res
      .status(202)
      .json(
        responseBuilder(true, 204, "SUCCESS", { deleted_product: product })
      );
  } catch (err) {
    res
      .status(500)
      .json(
        responseBuilder(false, 500, "SERVER_ERROR", {
          detail: "Failed to delete the product",
          error: err.message,
        })
      );
  }
};
 */
