const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public")); //can refer to static files using a relative url
app.use(bodyParser.urlencoded({ extended: true }));

// when we request the home route from our server deliver the file at following directory name
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // data used to send post request to mailchimp and subscribe user
  let data = {
    members: [
      //body parameter from mailChimp API
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  //turn js object to flatpack JSON
  let jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/8576d9a8aa";

  const options = {
    method: "POST",
    auth: "emmanuel:b0ea4aa80d2ed58ce62c3192208dada0-us8",
  };

  //make post request to mailchimp using user data entered to sign up page
  const request = https.request(url, options, function (response) {
    //check if response was successful (200)
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  //pass data to mailchimp server and end request
  request.write(jsonData);
  request.end();
});

//redirect user to root route from failure page when try again button pressed
app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

//API Key
// b0ea4aa80d2ed58ce62c3192208dada0-us8

//audience id
// 8576d9a8aa
