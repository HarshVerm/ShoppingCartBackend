const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  emptyCart,
  removeById,
  changeQuantity,
} = require("../Controller/cart-controller");

const { authenticateToken } = require("../Middleware/authenticateToken");

router.get("/cart", authenticateToken, getCart);
router.post("/addToCart", authenticateToken, addToCart);
router.delete("/removeProduct/:id", removeById);
router.delete("/removeCart/:id", emptyCart);
router.put("/changeQuantity/:id", changeQuantity);

module.exports = router;
