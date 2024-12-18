import mongoose from "mongoose";
import ENV from "./enviroment.config.js"; // Cargar las variables del entorno

// Conectar a la base de datos MongoDB
mongoose
  .connect(ENV.MONGO_URI) // Usar la URI local de MongoDB desde el archivo .env
  .then(() => {
    console.log("Connected to the MongoDB database 🦾");
  })
  .catch((error) => {
    console.error("ERROR connecting to database", error);
  });

export default mongoose;
