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

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

//GET /articles route fetches all the articles
app.get("/articles", function(req, res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else{
            res.send(err);
        }
    });
}); 

app.listen(3000, function(){
    console.log("Server started on port 3000");
});