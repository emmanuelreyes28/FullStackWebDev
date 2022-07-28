const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

//detect keyboard press to start game
$(document).keypress(function () {
  //call next sequence when button gets pressed for the first time
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

//when button clicked play/animate button and add to userClickedPattern
$(".btn").on("click", function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  //pass in index of the last answer in the player's sequence
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //check if most recent player answer is the same as gamePattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //check if player has finished their sequence
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //play wrong sounds and give feedback by changing body bg color
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //change h1 text to restart game
    $("#level-title").text("Game Over, Press Any Key To Restart");

    //start game over
    startOver();
  }
}

function nextSequence() {
  //reset userClickedPatter to empty array to get ready for next level
  userClickedPattern = [];

  //update level every time next sequence is called
  level++;
  $("#level-title").text("Level " + level.toString());

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

function playSound(name) {
  //play corresponding audio for randomChoseColor
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
