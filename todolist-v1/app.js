const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"]; //array to store items that are to to-do list

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  //render dynamic variables that are going to be populated
  res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  //add new to do item to items array
  items.push(item);

  //cannot res.render() item like in get request bc newListItem is not defined when home route loads
  //instead redirect to the home route once a new item has been added by user
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
