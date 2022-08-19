const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js") //requiring a module 

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"]; //array to store items that are to to-do list
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //able to use static files

app.get("/", function (req, res) {
  const day = date.getDate();

  //render dynamic variables that are going to be populated
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  console.log(req.body)
  const item = req.body.newItem;

  //check which list the req came from and redirect to respective route
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

  //cannot res.render() item like in get request bc newListItem is not defined when home route loads
  //instead redirect to the home route once a new item has been added by user
  //res.redirect("/");
});

// route to work page which contains items for the work to do list
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
