var button = document.querySelectorAll(".drum");
// .addEventListener("click", clickMe);

function clickMe() {
  //console.log(this.color);
  this.style.color = "white";
}

for (var i = 0; i < button.length; i++) {
  button[i].addEventListener("click", clickMe);
}

// var tom1 = new Audio("sounds/tom-1.mp3");
// tom1.play();
