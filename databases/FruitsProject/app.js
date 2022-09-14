const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });
run().catch(err => console.log(err));

async function run(){
    // connect to mongo server and specify db that we want to create or connect to 
    await mongoose.connect("mongodb://localhost:27017/fruitsDB");
}

// create scheman with properties
const fruitSchema = new mongoose.Schema({
    name: { //requires name to be passed and logs error message if fails
        type: String,
        required: [true, "please check your data entry, no name specified"]
    },
    rating: { //validates rating to be btwn 1 and 10
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// turn schema into a model
// mongoose will turn "Fruit" into fruits 
const Fruit = mongoose.model("Fruit", fruitSchema);

// create a new fruit document
const fruit = new Fruit({
    rating: 10,
    review: "peaches are so yummy"
});

// save fruit document in fruitDB
//fruit.save()

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
    name: "Mango",
    score: 10,
    review: "juiciest fruit"
});

mango.save();

// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favoriteFruit: pineapple
// });

// person.save();

// const kiwi = new Fruit({
//     name: "Kiwi",
//     score: 10,
//     review: "the best fruit!"
// });

// const orange = new Fruit({
//     name: "Orange",
//     score: 4,
//     review: "Too sour for me"
// });

// const banana = new Fruit({
//     name: "Banana",
//     score: 3,
//     review: "weird texture"
// });

//insert fruit docs above using an array into Fruit model
// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Successfully saved all the fruits to fruitDB");
//     }
// });

// print all documents in fruitsDB wihtin app.js
// use .find() callback function
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    } else{
        // close mongo connection takes about 10-15 sec
        mongoose.connection.close();

        // print each fruit name in fruits array
        fruits.forEach(fruit => console.log(fruit.name));
    }
})

//update doc that got added without the name peach before validation was implemented
// Fruit.updateOne({_id: "631abc61443b895256d16c7b"}, {name: "Peach"}, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("successfully updated the document");
//     }
// });

// Fruit.deleteOne({name: "Peach"}, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("successfully deleted document");
//     }
// });

// Fruit.deleteOne({_id: "631abd65e1d0b5c267f60a31"}, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("successfully deleted document");
//     }
// });

// Person.deleteMany({name: "John"}, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("successfullly deleted all Johns");
//     }
// });

Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err){
    if(err){
        console.log(err);
    } else{
        console.log("successfully updated John doc");
    }
})