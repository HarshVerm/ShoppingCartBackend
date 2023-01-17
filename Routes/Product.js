const express = require("express");
const router = express.Router();
const {
  getData,
  getById,
  searchResult,
} = require("../Controller/product-contoller");

router.get("/products", getData);
router.get("/product/:id", getById);
router.post("/search", searchResult);

module.exports = router;
