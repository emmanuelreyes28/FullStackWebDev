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

//////////////////////////////////Request Targeting All Articles//////////////////////////////////

//chain route handlers
app.route("/articles")

//GET /articles route fetches all the articles from wikiDB's Article model 
.get(function(req, res){
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
})

//use postman to send data with post without having to build a front end
//post new data requested to wikiDB with title and content key/values and save document to db
.post(function(req, res){

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
})

//delete method used to delete articles from wikiDb
.delete(function(req, res){
    //delete ALL articles since there is no condition being used with deleteMany
    Article.deleteMany(function(err){
        if(!err){
            //respond with success message
            res.send("Successfully deleted all articles");
        } else{
            //responsd with error 
            res.send(err);
        }
    });
});

//////////////////////////////////Request Targeting A Specific Article//////////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res){
    //get specified articles from param in url
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        //if article found responsd with foundArticles
        if(foundArticle){
            res.send(foundArticle);
        } else{
            //otherwise respond with no articles found message
            res.send("No articles matching that title was found.")
        }
    });
})

.put(function(req, res){
    Article.findOneAndUpdate(
        //find article that needs to be updated
        {title: req.params.articleTitle},
        //update found article with new contents
        //note that if a title or content value is not given in the body then it will only update the data given and leave the null values empty
        //in other words completely replaces/overwrites the current data with the new data
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err){
            //if no error respond with success message
            if(!err){
                res.send("Successfully updated article");
            } else{
                res.send(err);
            }
        }
    );
})

.patch(function(req, res){
    //when a patch request is made it will parse it with bodyparser and update only the fields that have a new value
    Article.updateOne(
        {title: req.params.articleTitle},
        //the $set operator replaces the value of a field with the specified value.
        {$set: req.body},
        function(err){
            if(!err){
                res.send("Successfully updated article");
            } else{
                res.send(err);
            }
        }
    );
})

.delete(function(req, res){
    //find and delete article title passed in params
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                //if no errors respond with success message 
                res.send("Successfully deleted article");
            } else {
                //respond with error message 
                res.send(err);
            }
        }
    );
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});