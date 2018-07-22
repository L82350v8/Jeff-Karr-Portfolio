const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const exphbs = require("express-handlebars");
const path = require("path");
const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

var PORT = process.env.PORT || 3000;

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("main");
});

app.post("/send", (req, res) => {

  // note: contactMsg assignment begins and ends with "backtick" symbols (ES6 syntax).  
  const contactMsg = 
    ` <p>A new message was received from the Jeff-Karr-Portfolio website.</p>      
      <h2>Contact Details</h2>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <p>Subject: ${req.body.subject}</p>
      <p>${req.body.message}</p>
    `
  
  const data = {
    from: process.env.MAILGUN_SENDING_EMAIL,
    to: process.env.MAILGUN_RECEIVING_EMAIL,
    subject: req.body.subject,
    html: contactMsg
  };

  mailgun.messages().send(data, function (error, mgRes) {
    if(error) {
      console.log(error);
    }
    if(mgRes.message === 'Queued. Thank you.') {
      res.send({status: 200});
    }
  });
});

app.listen(PORT, function () {
  console.log("server running on port " + PORT + "!");
});


