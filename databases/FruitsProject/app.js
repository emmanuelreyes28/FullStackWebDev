const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {useUnifiedTopology: true});

const dbName = "fruitsDB";

async function run() {
  try {
    await client.connect(function(){
        console.log("connected successfully to server");
    })
    const database = client.db(dbName);
    //get the documents collection
    const collection = database.collection('fruits');

    //documents to be insterted in fruitsDB
    const docs = [
        {
          name: 'Apple',
          score: 8,
          review: "Great fruit"
        },
        {
          name: "Orange",
          score: 6,
          review: "Kinda sour"
        },
        {
          name: "Bananna",
          score: 9,
          review: "Great stuff!"
        }
    ];

    const options = {ordered: true};

    //insert some documents
    const result = await collection.insertMany(docs, options);

    console.log("documents were inserted");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);