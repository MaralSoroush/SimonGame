var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;



function nextSequence(){
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level );
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){$("#" + color).removeClass("pressed");}, 100)
}

function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        if(gamePattern.length === userClickPattern.length){
            setTimeout(nextSequence, 300);
        }
    }
    else{
        gameOver();
    }
}

function gameOver(){
    playSound("wrong");
    $("#level-title").text("Game over!");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");
    $("#level-title").text("Press A Key to Start");},1500);
    started = false;
    level = 0;
    userClickPattern = [];
    gamePattern = [];
    

}

$(document).keydown(function() {
    if (!started) {
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){
    var userChoosenColor = this.id;
    userClickPattern.push(userChoosenColor);
    console.log(userClickPattern);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickPattern.length - 1);

});