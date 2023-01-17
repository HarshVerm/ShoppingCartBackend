const { date, string } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      default: Date,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("cartlist", cartSchema);
