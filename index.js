var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").on("click", function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


function nextSequence() {
    userClickedPattern = [];
    var radnum = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[radnum];

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChoosenColor);

    playSound(randomChoosenColor);
    level++;
    $("h1").text("Level " + level);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$("body").keydown(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    };
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over!!!!");
        setTimeout(function () {
            $("body").removeClass("game-over");
            $("h1").text("Press Any Key to Restart");
        }, 1000)
        startOver();
    } else {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}