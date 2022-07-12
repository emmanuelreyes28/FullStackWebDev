function getRandomRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

var randomNumber1 = Math.floor(Math.random() * 6) + 1;

var image1 = "images/dice" + randomNumber1 + ".png";

document.querySelector(".dice .img1").setAttribute("src", image1);
