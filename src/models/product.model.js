import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0, // Puedes agregar un valor predeterminado si no tienes stock en tu JSON
  },
  category: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
    select: false,
  },
  image: {
    type: String, // Usamos String para la ruta de la imagen (puedes cambiar el nombre del campo según convenga)
  },
  productType: {
    // Nuevo campo que podrías usar si "product" en tu JSON tiene un propósito específico.
    type: String,
    required: true,
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
