import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    // Nuevo campo para apellido
    type: String,
    required: true,
  },
  dni: {
    // Nuevo campo para DNI
    type: String,
    required: true,
    unique: true, // Si quieres que el DNI sea único
  },
  phone: {
    // Nuevo campo para teléfono
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String, // Este token se usará para verificar el correo electrónico o para la recuperación de cuenta
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user", // Puedes cambiar el valor predeterminado si manejas diferentes roles
  },
  resetPasswordToken: {
    // Token para recuperar la contraseña
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    // Fecha de expiración del token de recuperación
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
