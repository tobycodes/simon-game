
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Function to fire button click event and play sound after click event happens
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);

});


// Function to check answer at current level
function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 1000);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
    startOver();
    }, 1000);

  }

}



function nextSequence() {

  userClickedPattern = [];

  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}


// Function to play sound after button is clicked

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}







// Function to animate button press
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
  $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function startOver(){

  gamePattern = [];
  level = 0;
  started = false;

}
