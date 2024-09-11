
function controller(event) {
    if (event.key == "Enter") {
        if (runWokerNumber == 0) {
            run();
            runSound.play();
            updateScore();
            moveBackground();
            flameLocations.forEach(generateFlames);
        }

    }

    if (event.key == " ") {
        if (jumpWorkerNumber == 0) {
            if (runWokerNumber != 0) {
                clearInterval(runWokerNumber);
                runSound.pause();
                jump();
                jumpSound.play();

            }
        }


    }
}

//.......run........................................................

var runWokerNumber = 0;
var runImageNumber = 1;
var runSound = new Audio("run.mp3")
runSound.loop = true;

function run() {
    runWokerNumber = setInterval(() => {
        runImageNumber = runImageNumber + 1;

        if (runImageNumber == 9) {
            runImageNumber = 1;
        }

        document.getElementById("boy").src = "run" + runImageNumber + ".png";
    }, 150);
}

//.......................jump.............................................................................

var jumpWorkerNumber = 0;
var jumpImgeNumber = 1;
var boyMarginTop = 395;
var jumpSound = new Audio("jump.mp3");

function jump() {
    jumpWorkerNumber = setInterval(() => {
        jumpImgeNumber = jumpImgeNumber + 1;

        //....................jump(up to down)..............
        if (jumpImgeNumber < 8) {
            boyMarginTop = boyMarginTop - 20;
            document.getElementById("boy").style.marginTop = boyMarginTop + "px";
        }
        if (jumpImgeNumber >= 8) {
            boyMarginTop = boyMarginTop + 20;
            document.getElementById("boy").style.marginTop = boyMarginTop + "px";
        }


        //.................add image .....................
        if (jumpImgeNumber == 13) {
            jumpImgeNumber = 1;
            clearInterval(jumpWorkerNumber);
            jumpWorkerNumber = 0;
            run();
            runSound.play();
        }
        document.getElementById("boy").src = "jump" + jumpImgeNumber + ".png";
    }, 100);
}

//...................dead....................................................................................

var deadWorkerNumber = 0;
var deadImageNumber = 1;
var deadSound = new Audio("dead.mp3");

function dead() {
    deadWorkerNumber = setInterval(() => {
        deadImageNumber = deadImageNumber + 1;
        if (deadImageNumber == 11) {
            deadImageNumber = 1;
            clearInterval(deadWorkerNumber);
            alert("game over");
            window.location.reload();
        }
        document.getElementById("boy").src = "dead" + deadImageNumber + ".png";
    }, 100);
}


//...............score..................................................

var scoreWorkerNumber = 0;
var score = 0;

function updateScore() {

    scoreWorkerNumber = setInterval(() => {
        score = score + 5;
        if ( score == 360){
            runSound.pause();
            alert("you won");
            window.location.reload();
        }
        

        document.getElementById("score").innerHTML = score;
    }, 150);
}

//....................background.................................

var backgrundWorkerNumber = 0;
var backgoundX = 0;

function moveBackground() {
    backgrundWorkerNumber = setInterval(() => {
        backgoundX = backgoundX - 10;
        document.getElementById("background").style.backgroundPositionX = backgoundX + "px";
    }, 50);
}


//........................flames..............................
var flameLocations = [500, 1000, 1500, 2000];
flameWoker = 0;


function generateFlames(x) {
    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(i);

    flameWoker = setInterval(() => {
        if (x == 100){

            if(jumpWorkerNumber == 0){
            alert("dead");
            clearInterval(runWokerNumber);
            runSound.pause();
            clearInterval(backgrundWorkerNumber);
            clearInterval(scoreWorkerNumber);
            dead();
            deadSound.play();

            }
            
        }

        x = x - 10;
        i.style.marginLeft = x + "px";
    }, 50)

}