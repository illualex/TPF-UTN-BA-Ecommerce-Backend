import UserRepository from "../repositories/user.repository.js";

// Funciones de validación
const validateEmail = (value) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return regex.test(String(value).toLowerCase());
};

const validateLength = (value, minLength) => value.length >= minLength;

const validatePositiveNumber = (value) => value > 0;

const validateNotEmpty = (value) => value.trim() !== "";

const validateCategorySelected = (value) => value !== null;

// Objeto de errores
export const ERRORS = {
  USERNAME_LENGTH: {
    message: "Your name must be at least 3 characters long",
    id: 1,
    property: "name",
    validate: (value) => validateLength(value, 3),
  },
  PASSWORD_LENGTH: {
    message: "Your password must be at least 8 characters long",
    id: 2,
    property: "password",
    validate: (value) => validateLength(value, 8),
  },
  EMAIL_FORMAT: {
    message: "Invalid email format",
    id: 3,
    property: "email",
    validate: validateEmail,
  },
  PRODUCT_NAME_LENGTH: {
    message: "The product name must be at least 5 characters long",
    id: 4,
    property: "name",
    validate: (value) => validateLength(value, 5),
  },
  PRODUCT_DESCRIPTION_LENGTH: {
    message: "The description must be at least 15 characters long",
    id: 5,
    property: "description",
    validate: (value) => validateLength(value, 15),
  },
  PRODUCT_PRICE_VALUE: {
    message: "The price must be greater than 0",
    id: 6,
    property: "price",
    validate: validatePositiveNumber,
  },
  PRODUCT_STOCK_VALUE: {
    message: "The stock must be greater than 0",
    id: 7,
    property: "stock",
    validate: validatePositiveNumber,
  },
  PRODUCT_CATEGORY: {
    message: "Please select a valid category",
    id: 8,
    property: "category",
    validate: validateCategorySelected,
  },
  EMPTY_FIELD: {
    message: "This field cannot be empty",
    id: 9,
    validate: validateNotEmpty,
  },
};

// Ejemplo de funciones comentadas que puedes implementar si las necesitas más adelante
// const validateEmailNotRegistered = async (email) => {
//   try {
//     const user = await UserRepository.getByEmail(email);
//     return user === null; // Devuelve true si el email no está registrado
//   } catch (err) {
//     console.error("Error validating email:", err.message);
//     return false;
//   }
// };

// EMAIL_ALREADY_REGISTERED: {
//   message: "This email is already registered",
//   id: 10,
//   property: "email",
//   validate: validateEmailNotRegistered,
// },
