import jwt from "jsonwebtoken";
import ENV from "../config/enviroment.config.js";

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const isRolePermitted = (userRole, permittedRoles) => {
  return !permittedRoles.length || permittedRoles.includes(userRole);
};
