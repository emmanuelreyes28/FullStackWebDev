const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// use body parser to get values being passed into the html form
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  //__dirname returns the path where this file is located
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function (req, res) {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);

  let result = num1 + num2;

  res.send("The result of the calculation is " + result);
});

app.post("/bmicalculator", function (req, res) {
  console.log(req.body);
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);

  let bmi = weight / (height * height);

  res.send("Your BMI is " + bmi);
});

app.listen(3000, function () {
  console.log("Startig server on port 3000");
});
