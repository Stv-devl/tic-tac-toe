//variables
const starter = document.getElementById("starter");
const game = document.getElementById("game");
const chooseCross = document.getElementById("chooseCross");
const chooseCircle = document.getElementById("chooseCircle");
const restart = document.getElementById("restart");
const box = document.querySelectorAll(".box");
let cross, circle, mutliplayers, VsComputer, i;

/*************************************functions************************************/

/******************Starter page**************************/

// Function to launch when the starter page is open (game starter page)
function pageLaunch() {
  starter.classList.add("activate");
  chooseCircle.classList.add("circleActive");
  cross = false;
  circle = true;
}
pageLaunch();

//Player 1 choose the cross
function choiceCross() {
  chooseCross.classList.add("crossActive");
  chooseCircle.classList.remove("circleActive");
}

//Player 1 choose the circle
function choiceCircle() {
  chooseCross.classList.remove("crossActive");
  chooseCircle.classList.add("circleActive");
}

//fonction to activate the Game page
function start() {
  starter.classList.remove("activate");
  game.classList.add("launch");
}

//fonction  to see player type of game choice
function playerChoice() {
  if (cross == true && VsComputer == true) {
    start();
    onePlayersP1Cross();
  } else if (circle == true && VsComputer == true) {
    start();
    onePlayersP1Circle();
  } else if (cross == true && mutliplayers == true) {
    start();
    twoPlayersP1Cross();
  } else if (circle == true && mutliplayers == true) {
    start();
    twoPlayersP1Circle();
  } else {
    alert = "Error";
  }
  return;
}

/******************game page**************************/

// player against CPU player 1 choose the cross
function onePlayersP1Cross() {
  playerLeft.textContent = "X (You)";
  playerRight.textContent = "0 (CPU)";
}
// player against CPU player 1 choose the circle
function onePlayersP1Circle() {
  playerLeft.textContent = "X (CPU)";
  playerRight.textContent = "0 (You)";
}

// 2 players, player 1 choose the cross
function twoPlayersP1Cross() {
  playerLeft.textContent = "X (P1)";
  playerRight.textContent = "0 (P2)";
}

// 2 players, player 1 choose the circle
function twoPlayersP1Circle() {
  playerLeft.textContent = "X (P2)";
  playerRight.textContent = "0 (P1)";
}

// restart the game and back to starter page
function restartGame() {
  starter.classList.add("activate");
  game.classList.remove("launch");
}

//player 1, next player 2

function gameDisplay(data) {
  if (cross == true) {
    data.target.classList.add("crossClicked");
    return (cross = false);
  } else {
    data.target.classList.add("circleClicked");
    return (cross = true);
  }
}

/*************************************AddEventListener************************************/

//for each button
box.forEach((element) => {
  element.addEventListener("click", (data) => {
    i = data.target.id[4];
    console.log(i);
    gameDisplay(data);
  });
});

//choose the cross (starter page)
chooseCross.addEventListener("click", (e) => {
  cross = true;
  circle = false;
  choiceCross();
});

//choose the circle (starter page)
chooseCircle.addEventListener("click", (e) => {
  cross = false;
  circle = true;
  choiceCircle();
});

//play against CPU (starter page)
vsCpu.addEventListener("click", (e) => {
  VsComputer = true;
  mutliplayers = false;
  playerChoice();
});

//play against an other player (starter page)
players.addEventListener("click", (e) => {
  VsComputer = false;
  mutliplayers = true;
  playerChoice();
});

//restart button (game page)
restart.addEventListener("click", (e) => {
  restartGame();
});

/*
//I have problem to do hover so use javascript => for cross
chooseCross.addEventListener(
  "mouseenter",
  function (event) {
    if (event.target.classList.contains("crossActive")) return;
    else {
      event.target.style.backgroundColor = " rgb(43, 60, 69)";
    }
    setTimeout(function () {
      event.target.style.backgroundColor = "";
    }, 500);
  },
  false
);
*/
/*
//I have problem to do hover so use javascript => for circle
chooseCircle.addEventListener(
  "mouseenter",
  function (event) {
    if (event.target.classList.contains("circleActive")) return;
    else {
      event.target.style.backgroundColor = " rgb(43, 60, 69)";
    }
    setTimeout(function () {
      event.target.style.backgroundColor = "";
    }, 500);
  },
  false
);
*/
