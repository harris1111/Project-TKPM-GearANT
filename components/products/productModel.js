const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  availability: {
    type: Number,
    default: 0,
  },
  description: String,
  category: String,
  gender: String,
  image: [String],
  sale: { type: Number, default: 0 },
  weight: Number,
  dimensions: String,
  materials: String,
  review: {
    type: Number,
    default: 0
  },
  review_detail: {
    type: [{ username: String, comment: String }],
    default: [],
  },
  gen: String,
  saleNumber: { type: Number, default: 0 },
});
const product = mongoose.model("Product", productSchema);

module.exports = product;
