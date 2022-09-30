const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

//used to parse our request
app.use(bodyParser.urlencoded({extended: true}));
//store our static files in public
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {userNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

app.listen(3000, function(){
    console.log("Server started on port 3000");
});