const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public")); //can refer to static files using a relative url
app.use(bodyParser.urlencoded({ extended: true }));

// when we request the home route from our server deliver the file at following directory name
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  console.log(firstName, lastName, email);
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
