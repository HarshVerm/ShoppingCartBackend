const Products = require("../Models/product");

const getData = (req, res) => {
  Products.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error:" + err));
};

const getById = (req, res) => {
  let id = req.params.id;
  // console.log(req.params);
  Products.findOne({ _id: id })
    .then((data) => {
      if (data.length != 0) {
        return res.status(200).json(data);
      }
      return res.status(404).send({ Error: "Product Id is not valid" });
    })
    .catch((err) => res.status(400).send("error", err));
};

const searchResult = (req, res) => {
  let query = req.body.query;
  console.log(query);
  Products.find({ product_name: { $regex: query, $options: "$i" } }).then(
    (data) => {
      res.status(200).send(data);
    },
  );
};

module.exports = { getData, getById, searchResult };
