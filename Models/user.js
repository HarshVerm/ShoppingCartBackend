const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    last_name: {
      type: String,
      required: true,
      min: 3,
      max: 255,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    addresses: {
      type: Array,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("user", userSchema);
