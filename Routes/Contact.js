const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/contact", (req, res) => {
  console.log(req.body);
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    to: process.env.RECEIVER_EMAIL,
    from: req.body.email,
    subject: req.body.subject,
    html: `<html>
    <head>
    <title></title>
    </head>
    <body>
      <h5>Name:</h5>
      <p>${req.body.name}</p>    
      <h5>Email:</h5>
      <p>${req.body.email}</p>    
      <h5>Name:</h5>
      <p>${req.body.message}</p>    
          
    </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ error: false, msg: "mail sent seccessfully" });
    }
  });
});

module.exports = router;
