import nodemailer from "nodemailer";
import ENV from "../config/enviroment.config.js";

/**
 *
 * @param {Object} mailOptions
 * @param {string} mailOptions.to
 * @param {string} mailOptions.subject
 * @param {string} mailOptions.html
 *
 * @returns {Promise}
 */
export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.GMAIL_USERNAME,
      pass: ENV.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: ENV.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error("Error al enviar correo electrónico");
  }
};
