import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config/enviroment.config.js";
import User from "../models/user.model.js";
import UserRepository from "../repositories/user.repository.js";
import ResponseBuilder from "../utils/builders/responseBuilder.js";
import { sendEmail } from "../utils/mail.util.js";

export const createUserController = async (req, res) => {
  try {
    const { name, lastName, dni, phone, email, password } = req.body;

    if (!name || !lastName || !dni || !phone || !email || !password) {
      return res
        .status(400)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage("VALIDATION_ERROR")
            .setPayload({ detail: "All fields are required" })
            .build()
        );
    }

    const verificationToken = jwt.sign({ email }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_TIME,
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      lastName,
      dni,
      phone,
      email,
      password: hashedPassword,
      verificationToken,
    };

    const createdUser = await UserRepository.saveUser(newUser);

    const url_verification = `${ENV.FRONT_URL}/verify/${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Verificación de Email - GamerMania",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">¡Bienvenido a <span style="color: #FF4500;">GamerMania</span>!</h1>
            <p style="font-size: 16px; color: #555;">Gracias por registrarte. Para comenzar, verifica tu dirección de correo electrónico haciendo clic en el botón de abajo.</p>
          </div>
          <div style="text-align: center; margin-bottom: 30px;">
            <a 
              style="display: inline-block; background-color: #FF4500; color: white; padding: 15px 30px; border-radius: 5px; text-decoration: none; font-size: 18px; font-weight: bold;"
              href="${url_verification}"
            >
              Verificar Email
            </a>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #999;">
            <p style="font-size: 14px;">Si no realizaste esta solicitud, simplemente ignora este correo.</p>
            <p style="font-size: 14px;">© 2024 GamerMania. Todos los derechos reservados.</p>
          </div>
        </div>
      `,
    });

    return res
      .status(201)
      .json(
        new ResponseBuilder()
          .setOk(true)
          .setStatus(201)
          .setMessage("USER_CREATED")
          .setPayload({ user: createdUser })
          .build()
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setOk(false)
          .setStatus(500)
          .setMessage("SERVER_ERROR")
          .setPayload({ detail: err.message })
          .build()
      );
  }
};

export const verifyMailValidationTokenController = async (req, res) => {
  try {
    const { verification_token } = req.params;

    if (!verification_token) {
      return res
        .status(400)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage("BAD_REQUEST")
            .setPayload({ detail: "Invalid verification token" })
            .build()
        );
    }

    const decoded = jwt.verify(verification_token, ENV.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json(
        new ResponseBuilder()
          .setOk(false)
          .setStatus(404)
          .setMessage("USER_NOT_FOUND")
          .setPayload({
            detail: "User associated with this token was not found",
          })
          .build()
      );
    }

    user.emailVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Email successfully verified",
      user: user,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(400)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage("TOKEN_EXPIRED")
            .setPayload({ detail: "Verification token has expired" })
            .build()
        );
    }

    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setOk(false)
          .setStatus(500)
          .setMessage("SERVER_ERROR")
          .setPayload({ detail: err.message })
          .build()
      );
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.getByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage("USER_NOT_FOUND")
            .setPayload({ detail: "User is not registered. Please sign up" })
            .build()
        );
    }

    if (!user.emailVerified) {
      return res.status(403).json(
        new ResponseBuilder()
          .setOk(false)
          .setStatus(403)
          .setMessage("USER_NOT_VERIFIED")
          .setPayload({
            detail:
              "User not verified. Please check your email to verify your profile",
          })
          .build()
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage("INVALID_PASSWORD")
            .setPayload({ detail: "Incorrect password" })
            .build()
        );
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      ENV.JWT_SECRET,
      {
        expiresIn: ENV.JWT_TIME,
      }
    );

    return res.status(200).json(
      new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("Logged In")
        .setPayload({
          token,
          user: {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
        })
        .build()
    );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setOk(false)
          .setStatus(500)
          .setMessage("INTERNAL_SERVER_ERROR")
          .setPayload({ detail: err.message })
          .build()
      );
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage("BAD_REQUEST")
            .setPayload({ detail: "Email is required" })
            .build()
        );
    }

    const user = await UserRepository.getByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage("USER_NOT_FOUND")
            .setPayload({ detail: "No user found with this email address" })
            .build()
        );
    }

    if (user) {
      const resetToken = jwt.sign({ email: user.email }, ENV.JWT_SECRET, {
        expiresIn: "1h",
      });

      const resetUrl = `${ENV.FRONT_URL}/reset/${resetToken}`;

      await sendEmail({
        to: user.email,
        subject: "Restablecimiento de contraseña - GamerMania",
        html: `
          <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
            <h1 style="color: #222; text-align: center;">Restablecimiento de Contraseña</h1>
            <p style="font-size: 16px; color: #555; line-height: 1.6; text-align: justify;">
              Hola Terrícola, <br/><br/>
              Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <b>GamerMania</b>. 
              Si hiciste esta solicitud, por favor haz clic en el botón de abajo para restablecer tu contraseña. 
              Este enlace será válido por <b>1 hora</b>.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${resetUrl}" 
                style="display: inline-block; background-color: #007bff; color: #fff; padding: 12px 25px; font-size: 16px; border-radius: 5px; text-decoration: none; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">
                Restablecer Contraseña
              </a>
            </div>
            <p style="font-size: 14px; color: #777; line-height: 1.6; text-align: justify;">
              Si no solicitaste un cambio de contraseña, puedes ignorar este mensaje. Tu contraseña seguirá siendo la misma.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #aaa; text-align: center;">
              © 2024 GamerMania. Todos los derechos reservados.<br>
              Este mensaje fue enviado automáticamente. Por favor, no respondas a este correo.
            </p>
          </div>
        `,
      });
    }

    return res.status(200).json(
      new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("SUCCESS")
        .setPayload({
          message: "If the email exists, a reset link has been sent",
        })
        .build()
    );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setOk(false)
          .setStatus(500)
          .setMessage("SERVER_ERROR")
          .setPayload({ detail: err.message })
          .build()
      );
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    const { reset_token } = req.params;

    const decoded = jwt.verify(reset_token, ENV.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage("INVALID_TOKEN")
            .setPayload({ detail: "Invalid token" })
            .build()
        );
    }

    const user = await UserRepository.getByEmail(decoded.email);

    if (!user) {
      return res
        .status(401)
        .json(
          new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage("USER_NOT_FOUND")
            .setPayload({ detail: "User is not registered. Please register" })
            .build()
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json(
        new ResponseBuilder()
          .setOk(true)
          .setStatus(200)
          .setMessage("SUCCESS")
          .setPayload({ message: "Password reset successfully" })
          .build()
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ResponseBuilder()
          .setOk(false)
          .setStatus(500)
          .setMessage("SERVER_ERROR")
          .setPayload({ detail: err.message })
          .build()
      );
  }
};
