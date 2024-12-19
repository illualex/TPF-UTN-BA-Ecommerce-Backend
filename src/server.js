import express from "express";
import cors from "cors";
import ENV from "./config/enviroment.config.js"; // Asegúrate de que el archivo 'environment.config.js' esté en la ruta correcta
import statusRouter from "./routes/status.router.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js"; // Ruta para manejar los usuarios
import productRouter from "./routes/product.router.js"; // Ruta para manejar los productos
import subscriptionRouter from "./routes/subscription.router.js";

// Importar base de datos MongoDB
import mongoose from "./config/configMongoDB.js";

// Configuración de transporte para el envío de correos electrónicos
import transporter from "./config/transporter.config.js";

// Si tienes alguna lógica de inicialización, como cargar datos o llamar a servicios
import ProductRepository from "./repositories/product.repository.js";

const app = express();
const PORT = ENV.PORT || 3000;

// Configuración de CORS para permitir solicitudes solo desde el frontend de Vercel
const corsOptions = {
  origin: "https://tpf-utn-ba-ecommerce-frontend.vercel.app", // URL de tu frontend en Vercel
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Los encabezados que permites
};

app.use(cors(corsOptions)); // Aplicar CORS con las opciones configuradas
app.use(express.json({ limit: "5mb" })); // Límite de 5mb para las peticiones JSON

// Middleware para logs de las peticiones
app.use((req, res, next) => {
  console.log(`${req.method} ==> ${req.url}`);
  next();
});

// Rutas de la API
app.use("/api/status", statusRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter); // Ruta para gestionar usuarios
app.use("/api/products", productRouter); // Ruta para gestionar productos
app.use("/api/subscriptions", subscriptionRouter);

// Llamadas a la base de datos o inicializaciones necesarias
ProductRepository.getAll(); // Ejemplo: inicializar productos desde la base de datos si es necesario

// Conexión a la base de datos de MongoDB
mongoose
  .connect(ENV.MONGO_URI) // Reemplaza con la URL de tu base de datos MongoDB en el archivo .env
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port http://127.0.0.1:${PORT} 🚀`);
});
