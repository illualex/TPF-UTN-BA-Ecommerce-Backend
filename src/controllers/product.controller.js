import ProductRepository from "../repositories/product.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";
import { validateFormController } from "./errors.controller.js";
import ENV from "../config/enviroment.config.js";
import jwt from "jsonwebtoken";

export const getAllProductsController = async (req, res) => {
  try {
    const products = await ProductRepository.getAll();

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
    const { name } = req.query;

    if (!name) {
      return res.status(400).json(
        responseBuilder(false, 400, "BAD_REQUEST", {
          detail: "Product name is required for this request",
        })
      );
    }

    const regex = new RegExp(name, "i");

    const products = await ProductRepository.getByName(regex);

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
