import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT, // Puerto del servidor
  MONGO_URI: process.env.MONGO_URI, // URI de conexión a MongoDB
  FRONT_URL: process.env.FRONTEND_URL, // URL del frontend
  JWT_SECRET: process.env.JWT_SECRET, // Clave secreta para JWT
  JWT_TIME: process.env.JWT_TIME, // Tiempo de expiración del JWT
  GMAIL_PASS: process.env.GMAIL_PASS, // Contraseña de Gmail
  GMAIL_USERNAME: process.env.GMAIL_USERNAME, // Usuario de Gmail
  INTERNAL_API_KEY: process.env.INTERNAL_API_KEY, // API key interna
};

export default ENV;
