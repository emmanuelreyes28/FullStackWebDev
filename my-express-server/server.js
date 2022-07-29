const express = require("express");
const app = express();

//tell our server what to do when home route reached
app.get("/", function (req, res) {
  //console.log(req);
  res.send("<h1>Hello World!</h1>");
});

app.get("/contact", function (req, res) {
  res.send("Contact me at: emmanuel.reyes28@gmail.com");
});

app.get("/about", function (req, res) {
  res.send("Hello my name is Emmanuel Reyes and I am Software Engineer");
});

app.get("/hobbies", function (req, res) {
  res.send("<ul><li>Code</li><li>Beer</li><li>Exercise</li></ul>");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
