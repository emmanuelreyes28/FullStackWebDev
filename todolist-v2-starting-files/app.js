//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connect to mongoose db
mongoose.connect("mongodb://localhost:27017/todolistDB");

//create mongoose schema
const itemSchema = {
  name: String,
};

//create mongoose model (note: mongoose model name should capitalized)
const Item = mongoose.model("Item", itemSchema);

//create documents using model
const itemOne = new Item({name: "Buy Food"});
const itemTwo = new Item({name: "Study"});
const itemThree = new Item({name: "Workout"});

//array of documents
const defaultItems = [itemOne, itemTwo, itemThree];

app.get("/", function(req, res) {

  //render items from db to route
  Item.find({}, function(err, foundItems){
    //check if items db collection is empty, if so save default data
    if(foundItems.length === 0){
      //insert array of documents to Item db model using insertMany()
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err)
        } else{
          console.log("Successfully uploaded documents to Items db");
        }
      });
      //redirect to root route after default items have been added to dd; will fall in else case
      res.redirect("/");
    } else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });

  
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;

  //create new document when new to do is added to list
  const item = new Item({name: itemName});

  //save new document to items collection 
  item.save();

  //redirect to root route to render items 
  res.redirect("/");
});

app.post("/delete", function(req, res){
  //grab item id from list.ejs
  const checkedItemId = req.body.checkbox;

  //remove item selected from to do list
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(err){
      console.log(err);
    } else{
      console.log("Successfully removed item from collection");
      //redirect to root route to update to do list
      res.redirect("/");
    }
  })
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
