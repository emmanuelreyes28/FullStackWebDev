//$ stand for jQuery.

//adds css class big title and maring 50 to h1
$("h1").addClass("big-title margin-50");

//manipulate text with jQuery
$("h1").text("Bye");

$("button").html("<em>Click me</em>");

//get attribute values
console.log($("img").attr("src"));

//set attribute values
$("a").attr("href", "https://www.yahoo.com");

//Adding event listeners with jQuery

//if h1 clicked change color to purple
$("h1").click(function () {
  $("h1").css("color", "purple");
});

//select all buttons in page and if clicked changes the h1 color to purple
$("button").click(function () {
  $("h1").css("color", "purple");
});

//checks if keypress has occured within input and prints key to console
$("input").keypress(function (event) {
  console.log(event.key);
});

//checks for any keypressed within the whole page and
//changes the h1 text to the key that was pressed
$("body").keypress(function (event) {
  $("h1").text(event.key);
});

//more flexible way of adding event listener by using on method
$("h1").on("mouseover", function () {
  $("h1").css("color", "blue");
});

//use jQuery to add and remove elements on the fly
/**
 * before() - add element before item that is selected
 * after() - add element after item that is selected
 * prepend()- add element into the item that is selected just right before
 * append() -  add element into the item that is selected after it
 */

$("h1").before("<button>New</button>");

$("h1").after("<button>New</button>");

$("h1").prepend("<button>New</button>");

$("h1").append("<button>New</button>");

//remove elements with jQuery
//$("button").remove(); // removes all button on page

//animate with jQuery
$("button").on("click", function () {
  $("h1").slideUp().slideDown().animate({ opacity: 0.5 });
});
