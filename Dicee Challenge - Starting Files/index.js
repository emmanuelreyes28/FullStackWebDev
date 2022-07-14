// function getRandomRoll() {
//   return Math.floor(Math.random() * 6) + 1;
// }

// var randomNumber1 = Math.floor(Math.random() * 6) + 1;
// var randomNumber2 = Math.floor(Math.random() * 6) + 1;

// var leftImage = "images/dice" + randomNumber1 + ".png";
// var rightImage = "images/dice" + randomNumber2 + ".png";

// document.querySelector(".dice .img1").setAttribute("src", leftImage);
// document.querySelector(".dice .img2").setAttribute("src", rightImage);

// if (randomNumber1 > randomNumber2) {
//   document.querySelector("h1").textContent = "🚩Player 1 Wins";
// } else if (randomNumber1 < randomNumber2) {
//   document.querySelector("h1").textContent = "Player 2 Wins🚩";
// } else {
//   document.querySelector("h1").textContent = "Draw";
// }

//different way of approaching solution
var randomNumber1 = Math.floor(Math.random() * 6) + 1;

var randomDiceImage = "/dice" + randomNumber1 + ".png";

var randomImageSource = "images" + randomDiceImage;

var image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src", randomImageSource);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var randomImageSource2 = "images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);

if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "🚩 Player 1 Wins";
} else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").innerHTML = "Player 2 Wins 🚩";
} else {
  document.querySelector("h1").innerHTML("Draw!");
}
