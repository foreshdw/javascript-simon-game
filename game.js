var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// memulai permainan
var startGame = false;
var level = 0;
$(document).on("keydown", function() {
    if (startGame == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        startGame = true;
    }
});

// button yang diklik user
$(".btn").on("click", function(){
    if(startGame == true) {
        userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        makeSound(userChosenColour);
        animatePress(userChosenColour);

        // kode kalau mau buat sesuai contoh yaitu akan game over jika langsung klik pola yang salah
        var currentAnswer = userClickedPattern;
        checkAnswer(currentAnswer);
        
        // kode kalau mau buat simon yang detect salah setelah user isi semua pattern
        // if(userClickedPattern.length == gamePattern.length) {
        //     var currentAnswer = userClickedPattern;
        //     checkAnswer(currentAnswer);
        // }
    } else {
        userChosenColour = $(this).attr("id");
        makeSound(userChosenColour);
        animatePress(userChosenColour);
    }
});


// FUNCTIONS

// fungsi untuk menentukan pola selanjutnya
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    level += 1;
    $("#level-title").text("Level " + level);

    // pembuatan pola otomatis
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
    animatePress(randomChosenColour);
}

// fungsi untuk cek jawaban user
function checkAnswer(currentAnswer) {
    for(var i = 0; i < userClickedPattern.length; i++) {
        if(currentAnswer[i] != gamePattern[i]) {
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        } else if(userClickedPattern.length == gamePattern.length) {
            if(userClickedPattern[userClickedPattern.length - 1] == gamePattern[gamePattern.length - 1]) {
                userClickedPattern = [];
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        }
    }
}

// fungsi untuk restart game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    startGame = false;
}

// fungsi untuk membuat suara pada button
function makeSound(id) {
    switch(id) {
    case "green":
        var green = new Audio('sounds/green.mp3'); 
        green.play();
    break;

    case "red":
        var red = new Audio('sounds/red.mp3'); 
        red.play();
    break;

    case "yellow":
        var yellow = new Audio('sounds/yellow.mp3'); 
        yellow.play();
    break;

    case "blue":
        var blue = new Audio('sounds/blue.mp3'); 
        blue.play();
    break;
    } 
}

// fungsi untuk menambahkan animasi press pada tombol
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}