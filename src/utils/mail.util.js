import nodemailer from "nodemailer";
import ENV from "../config/enviroment.config.js";

/**
 * Envía un correo electrónico con los detalles proporcionados.
 * 
 * @param {Object} mailOptions - Opciones del correo electrónico.
 * @param {string} mailOptions.to - Dirección de correo electrónico del destinatario.
 * @param {string} mailOptions.subject - Asunto del correo electrónico.
 * @param {string} mailOptions.html - Contenido HTML del correo electrónico.
 * 
 * @returns {Promise} - Retorna una promesa que se resuelve cuando el correo es enviado.
 */
export const sendEmail = async ({ to, subject, html }) => {
  // Crea un transporter de nodemailer con la configuración del servicio de correo.
  const transporter = nodemailer.createTransport({
    service: "gmail", // o el servicio que estés usando
    auth: {
      user: ENV.GMAIL_USERNAME, // tu dirección de correo electrónico
      pass: ENV.GMAIL_PASS, // tu contraseña o una app password si usas Gmail con 2FA
    },
  });

  // Configuración del correo electrónico.
  const mailOptions = {
    from: ENV.EMAIL_USER, // el correo desde el que se enviará
    to,
    subject,
    html,
  };

  try {
    // Envía el correo electrónico.
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: ", info.response);
    return info;
  } catch (error) {
    console.error("Error al enviar correo: ", error);
    throw new Error("Error al enviar correo electrónico");
  }
};
