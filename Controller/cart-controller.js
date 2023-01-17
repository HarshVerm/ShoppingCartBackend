const Cart = require("../Models/cart");

// const getCart = (req, res) => {
//   const id = req.params.id;
//   //   const cart = req.body;
//   console.log(req.params);
//   Cart.find({ user_id: id }).then((data) => {
//     res.status(200).send(data);
//     res.end();
//   });
// };

const getCart = (req, res) => {
  console.log(req.id.id);
  Cart.find({ user_id: req.id.id }).then((data) => {
    res.status(200).send(data);
    res.end();
  });
};

const addToCart = async (req, res) => {
  const id = req.id.id;
  const product = req.body.product_id;
  let qty = req.body.qty;
  console.log(req.body);
  await Cart.findOne({
    user_id: id,
    product_id: product,
  }).then((data) => {
    if (data) {
      qty = Number(data.qty) + Number(qty);
      Cart.updateOne(
        { user_id: id, product_id: product },
        { qty: qty, date: Date().toLocaleString() },
      ).then((data) => {
        res.status(200).send(data);
      });
    } else {
      const newCart = new Cart({ ...req.body, user_id: id });
      newCart.save().then((data) => {
        res.status(200).status(200).send(data);
      });
    }
  });
};

const removeById = (req, res) => {
  Cart.findOneAndDelete({
    _id: req.params.id,
  }).then(() => {
    res.status(200).send("Product remove successfully");
  });
};
module.exports = { getCart, addToCart };

const emptyCart = (req, res) => {
  Cart.deleteMany({ user_id: req.params.id }).then(() =>
    res.status(200).send("Cart empty"),
  );
};

const changeQuantity = (req, res) => {
  let id = req.params.id;
  let qty = req.body.qty;
  console.log(req.body);
  Cart.findOneAndUpdate({ _id: id }, { qty: qty }).then((data) => {
    res.status(200).send("Product updated Suuccessfull");
  });
};

module.exports = { getCart, addToCart, removeById, emptyCart, changeQuantity };
