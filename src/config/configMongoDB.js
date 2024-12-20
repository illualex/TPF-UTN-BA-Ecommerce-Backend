import mongoose from "mongoose";
import ENV from "./enviroment.config.js";

mongoose
  .connect(ENV.MONGO_URI)
  .then(() => {
    console.log("Connected to the MongoDB database 🦾");
  })
  .catch((error) => {
    console.error("ERROR connecting to database", error);
  });

export default mongoose;
