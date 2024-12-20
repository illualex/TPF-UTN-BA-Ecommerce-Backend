import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  FRONT_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TIME: process.env.JWT_TIME,
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_USERNAME: process.env.GMAIL_USERNAME,
  INTERNAL_API_KEY: process.env.INTERNAL_API_KEY,
};

export default ENV;
