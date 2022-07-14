var button = document.querySelectorAll(".drum");
// .addEventListener("click", clickMe);

function clickMe() {
  alert("I got clicked");
}

for (var i = 0; i < button.length; i++) {
  button[i].addEventListener("click", clickMe);
}
