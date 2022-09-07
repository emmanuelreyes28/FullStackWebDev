const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });
run().catch(err => console.log(err));

async function run(){
    // connect to mongo server and specify db that we want to create or connect to 
    await mongoose.connect("mongodb://localhost:27017/personDB");
}

// create scheman with properties
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

// turn schema into a model
// mongoose will turn "Fruit" into fruits 
const Fruit = mongoose.model("Fruit", fruitSchema);

// create a new fruit document
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "pretty solid as a fruit."
});

// save fruit document in fruitDB
//fruit.save()

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 37
});

person.save();
