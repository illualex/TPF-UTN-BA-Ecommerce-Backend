import express from "express";
import {
  getAllProductsController,
  getProductByNameController,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProductsController);

productRouter.get("/search", getProductByNameController);

export default productRouter;
