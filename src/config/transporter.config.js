import nodemailer from "nodemailer";
import ENV from "./enviroment.config.js"; // Cargar las variables del entorno

// Crear el transporte para el correo usando Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.GMAIL_USERNAME, // Usuario de correo de Gmail
    pass: ENV.GMAIL_PASS, // Contraseña de correo de Gmail
  },
});

export default transporter;
