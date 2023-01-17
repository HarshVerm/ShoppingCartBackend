const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoute = require("./Routes/Product");
const userRoute = require("./Routes/Users");
const orderRoute = require("./Routes/Order");
const cartRoute = require("./Routes/Cart");
const contactRoute = require("./Routes/Contact");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", productRoute);
app.use("/", orderRoute);
app.use("/", userRoute);
app.use("/", cartRoute);
app.use("/", contactRoute);

mongoose.connect(
  process.env.MONGO_ATLAS_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log("Error  connecting the database");
    } else {
      console.log("Database connected");
    }
  },
);

app.listen(5000, () => {
  console.log("Server is running 5000");
});

//
// app.post("/account/register", (req, res) => {
//   User.find({ email: req.body.email })
//     .then((data) => {
//       if (data.length === 0) {
//         const newUser = new User(req.body);
//         newUser.save().then(() =>
//           res.status(200).send({
//             error: false,
//             messsage: "Registeration Successful",
//             userInfo: newUser,
//           }),
//         );
//       } else {
//         console.log(data);
//         res.status(409).send({ error: true, message: "User already exist" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send(err);
//     });
// });
//
// app.post("/api/login", (req, res) => {
//   console.log(req.body);
//
//   User.findOne({ email: req.body.email, password: req.body.password })
//     .then((data) => {
//       if (data.length != 0) {
//         return res.status(200).json(data);
//       }
//       return res.status(404).send({ Error: "User Not Found" });
//     })
//     .catch((err) => res.status(400).send("error", err));
// });
