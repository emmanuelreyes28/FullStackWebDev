const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = [];

function nextSequence() {
  //choose random color to add to sequence
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  //make randomChoseColor flash to show it was selected
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

$(document).keypress(function () {
  nextSequence();
});

$(".btn").on("click", function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
});

function playSound(name) {
  //play corresponding audio for randomChoseColor
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
