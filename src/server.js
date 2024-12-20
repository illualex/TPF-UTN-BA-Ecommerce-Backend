import express from "express";
import cors from "cors";
import ENV from "./config/enviroment.config.js";
import statusRouter from "./routes/status.router.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import subscriptionRouter from "./routes/subscription.router.js";

import mongoose from "./config/configMongoDB.js";

import transporter from "./config/transporter.config.js";

import ProductRepository from "./repositories/product.repository.js";

const app = express();
const PORT = ENV.PORT || 3000;

const corsOptions = {
  origin: [
    "https://tpf-utn-ba-ecommerce-frontend.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));

app.use((req, res, next) => {
  console.log(`${req.method} ==> ${req.url}`);
  next();
});

app.use("/api/status", statusRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/subscriptions", subscriptionRouter);

ProductRepository.getAll();

mongoose
  .connect(ENV.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port http://127.0.0.1:${PORT} 🚀`);
});
