const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // You can store image URLs or file paths
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  soldBy: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  shape: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Product", productSchema);
