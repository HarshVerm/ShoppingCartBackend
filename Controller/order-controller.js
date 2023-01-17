const Order = require("../Models/order");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
const request = require("request");
const dotenv = require("dotenv");

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

const checkout = (req, res) => {
  const totalPrice = req.body.totalPrice;
  // console.log(totalPrice);
  try {
    const options = {
      amount: 10 * (Number(totalPrice) * 73),
      currency: "INR",
      receipt: uuidv4(),
      payment_capture: 0,
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({ message: "Something went wrong" });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const placeOrder = (req, res) => {
  // console.log(req.body);
  // const orderDetail = req.body;
  try {
    return request(
      {
        method: "POST",
        url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: req.body.totalPrice,
          currency: "INR",
        },
      },
      async function (error, response, body) {
        if (error) {
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }
        const newOrder = new Order(req.body);
        newOrder
          .save()
          .then(() => {
            // console.log("order create");
            return res.status(200).send(body);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    );
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

const getOrderbyId = (req, res) => {
  Order.findOne({ _id: req.body.id }).then((data) => {
    if (data.length != 0) {
      return res.status(200).json(data);
    }
    return res.status(404).send({ Error: true, msg: "invalid order id" });
  });
};

const getAllOdersByUser = (req, res) => {
  console.log(req.body);
  Order.find({ user_id: req.body.id }).then((data) => {
    if (data.length != 0) {
      return res.status(200).json(data);
    }
    return res.status(404).send({ Error: true, msg: "no order found" });
  });
};

const getNoOdersByUser = (req, res) => {
  console.log(req.body);
  Order.find({ user_id: req.body.id }).then((data) => {
    if (data.length != 0) {
      return res.status(200).json(data.length);
    }
    return res.status(404).send({ Error: true, msg: "no order found" });
  });
};

module.exports = {
  checkout,
  placeOrder,
  getOrderbyId,
  getAllOdersByUser,
  getNoOdersByUser,
};
