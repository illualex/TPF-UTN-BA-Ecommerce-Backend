import { ERRORS } from "../data/errors.js";

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

export const validateFormController = (newUser) => {
  const errors = {};
  let error;

  for (const property in newUser) {
    if (newUser[property] === undefined || newUser[property] === "") {
      errors[property] = ERRORS.EMPTY_FIELD;
    } else {
      error = handleErrors(property, newUser[property]);
      if (error) {
        errors[property] = error;
      }
    }
  }

  return errors;
};

export const validateLoginFormController = (loginData) => {
  const errors = {};

  if (!loginData.email || loginData.email === "") {
    errors.email = ERRORS.EMPTY_FIELD;
  } else {
    const emailError = handleErrors("email", loginData.email);
    if (emailError) errors.email = emailError;
  }

  if (!loginData.password || loginData.password === "") {
    errors.password = ERRORS.EMPTY_FIELD;
  }

  return errors;
};
