const express = require("express");
const https = require("https"); //native node no need for npm install

const app = express();

// can only have one send within a given app method but can have multiple writes
app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=London&appid=e0510037a8dda7f1b676abfb08e30234&units=imperial";
  //grab json data from get request to api
  https.get(url, function (response) {
    console.log(response.statusCode);

    //on function can be used to grab data from reponse and turned into JSON object using JSON.parse()
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp; //grabs the temp from JSON object
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + description + "</p>");
      res.write(
        "<h1>The temperature in London is " + temp + " degrees Faranheit.</h1>"
      );
      res.write("<img src=" + imgURL + ">");
      res.send();
      //   const object = {
      //     name: "Emmanuel",
      //     favoriteFood: "burger",
      //   };
      //   //stringify takes a JSON object and turns it into a string
      //   console.log(JSON.stringify(object));
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
