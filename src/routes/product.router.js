import express from "express";
import {
  getAllProductsController,
  getProductByNameController,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

// Verificación del API Key en todas las rutas
/* productRouter.use(verifyApiKeyMiddleware); */

// Ruta para obtener todos los productos
// Requiere autenticación (verificación de token)
productRouter.get("/", getAllProductsController);

// Ruta para obtener productos por nombre (sin autenticación)
// No requiere autenticación ni verificación de token
productRouter.get("/search", getProductByNameController);

// Resto de rutas (requieren autenticación y permisos de "admin" o "seller")
// productRouter.post("/")
// productRouter.put("/:id")
// productRouter.delete("/:id")

export default productRouter;
