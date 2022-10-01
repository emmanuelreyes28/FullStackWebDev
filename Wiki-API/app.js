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

//GET /articles route fetches all the articles from wikiDB's Article model 
app.get("/articles", function(req, res){
    //find function here does not take a condition bc we want to grab ALL articles 
    Article.find(function(err, foundArticles){
        if(!err){
            //if no error respond with articles found 
            res.send(foundArticles);
        } else{
            //respond with err found
            res.send(err);
        }
    });
}); 

//use postman to send data with post without having to build a front end
//post new data requested to wikiDB with title and content key/values and save document to db
app.post("/articles", function(req, res){

    //create new article document using Article model
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    //save if there were no errors encountered 
    newArticle.save(function(err){
        if(!err){
            //respond with success message
            res.send("Successfully added a new article");
        } else{
            //respond with errr encountered
            res.send(err);
        }
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});