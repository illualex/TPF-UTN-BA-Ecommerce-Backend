import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import ENV from "../config/enviroment.config.js";
import { verifyToken, isRolePermitted } from "./token.middleware.js";
import { validateApiKey } from "./apiKey.middleware.js";
import ResponseBuilder from "../utils/builders/responseBuilder.js";

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(401)
      .setMessage("UNAUTHORIZED")
      .setPayload({ detail: "Access denied, token is missing" })
      .build();

    return res.status(401).json(response);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(401)
      .setMessage("UNAUTHORIZED")
      .setPayload({ detail: "Invalid token" })
      .build();

    return res.status(401).json(response);
  }
};

export const verifyTokenMiddleware = (permited_roles = []) => {
  return (req, res, next) => {
    try {
      const auth_header = req.headers["authorization"];
      if (!auth_header) {
        const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(401)
          .setMessage("Authorization missing")
          .setPayload({ detail: "Waiting for the authorization token" })
          .build();

        return res.status(401).json(response);
      }

      const decoded = verifyToken(auth_header);

      if (!decoded) {
        const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(401)
          .setMessage("Invalid token")
          .setPayload({ detail: "The provided token is not valid" })
          .build();

        return res.status(401).json(response);
      }

      req.user = decoded;

      if (!isRolePermitted(req.user.role, permited_roles)) {
        const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(403)
          .setMessage("RESTRICTED_ACCESS")
          .setPayload({ detail: "You do not have the right permissions" })
          .build();

        return res.status(403).json(response);
      }

      next();
    } catch (err) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("SERVER_ERROR")
        .setPayload({ detail: "Error in token verification" })
        .build();

      res.status(500).json(response);
    }
  };
};

export const verifyApiKeyMiddleware = (req, res, next) => {
  try {
    const apikey_header = req.header("x-api-key");
    if (!validateApiKey(apikey_header)) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(401)
        .setMessage("Unauthorized")
        .setPayload({ detail: "Invalid API key" })
        .build();

      return res.status(401).json(response);
    }

    next();
  } catch (err) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("INTERNAL_SERVER_ERROR")
      .setPayload({ detail: "Couldn't validate API key" })
      .build();

    res.status(500).json(response);
  }
};

export const recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(404)
        .setMessage("USER_NOT_FOUND")
        .setPayload({ detail: "User not found with the provided email" })
        .build();
      return res.status(404).json(response);
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 3600000;

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${ENV.FRONT_URL}/reset-password?token=${token}`;

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      text: `Please click the following link to reset your password: 
             ${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(500)
          .setMessage("EMAIL_SEND_FAILED")
          .setPayload({ detail: "Failed to send password reset email" })
          .build();
        return res.status(500).json(response);
      }

      const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("EMAIL_SENT")
        .setPayload({ detail: "Password reset email sent successfully" })
        .build();
      res.status(200).json(response);
    });
  } catch (err) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("SERVER_ERROR")
      .setPayload({ detail: "Error in password recovery process" })
      .build();
    res.status(500).json(response);
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("INVALID_TOKEN")
        .setPayload({ detail: "Token is invalid or has expired" })
        .build();
      return res.status(400).json(response);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("PASSWORD_RESET_SUCCESS")
      .setPayload({ detail: "Password has been successfully reset" })
      .build();

    res.status(200).json(response);
  } catch (err) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("SERVER_ERROR")
      .setPayload({ detail: "Error resetting password" })
      .build();
    res.status(500).json(response);
  }
};
