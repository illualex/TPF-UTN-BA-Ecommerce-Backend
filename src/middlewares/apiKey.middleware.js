import ENV from "../config/enviroment.config.js";

export const validateApiKey = (apikey) => {
  return apikey && apikey === ENV.INTERNAL_API_KEY;
};
