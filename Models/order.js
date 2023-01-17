const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    shipping_address: {
      type: Object,
      // required: true,
    },
    order_list: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("order", orderSchema);
