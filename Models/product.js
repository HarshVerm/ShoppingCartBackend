const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
