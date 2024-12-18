import { ERRORS } from "../data/errors.js"; // Asegúrate de que tienes este archivo con los errores definidos

// Función para manejar los errores según el campo y su valor
const handleErrors = (from, value) => {
  const errors = [];
  for (const key in ERRORS) {
    if (ERRORS[key].property === from) {
      if (!ERRORS[key].validate(value)) {
        return ERRORS[key];
      }
    }
  }
};

// Controlador para validar un formulario, como el de registro de un nuevo usuario
export const validateFormController = (newUser) => {
  const errors = {};
  let error;

  // Validamos los campos del nuevo usuario (nombre, email, contraseña, etc.)
  for (const property in newUser) {
    if (newUser[property] === undefined || newUser[property] === "") {
      errors[property] = ERRORS.EMPTY_FIELD; // Error por campo vacío
    } else {
      error = handleErrors(property, newUser[property]);
      if (error) {
        errors[property] = error; // Si hay un error de validación, lo agregamos
      }
    }
  }

  return errors; // Retornamos los errores encontrados
};

// Función para validar un formulario de inicio de sesión
export const validateLoginFormController = (loginData) => {
  const errors = {};

  // Validamos el email y la contraseña
  if (!loginData.email || loginData.email === "") {
    errors.email = ERRORS.EMPTY_FIELD; // Error si el email está vacío
  } else {
    const emailError = handleErrors("email", loginData.email);
    if (emailError) errors.email = emailError;
  }

  if (!loginData.password || loginData.password === "") {
    errors.password = ERRORS.EMPTY_FIELD; // Error si la contraseña está vacía
  }

  return errors; // Retornamos los errores encontrados
};
