const express = require("express");
const app = express();

app.get("/", function (req, res) {
  //__dirname returns the path where this file is located
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Startig server on port 3000");
});
