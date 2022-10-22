//variables
const starter = document.getElementById("starter");
const game = document.getElementById("game");
const chooseCross = document.getElementById("chooseCross");
const chooseCircle = document.getElementById("chooseCircle");
const restart = document.getElementById("restart");
const box = document.querySelectorAll(".box");
const combinaison = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const crossData = [];
const circleData = [];
let board = ["", "", "", "", "", "", "", "", ""];
let cross, circle, mutliplayers, VsComputer, i, player01, player02;

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

// restart the game and back to starter page (with)
function restartGame() {
  window.location.reload();
}

//player 1, next player 2
function gameDisplay(data) {
  console.log(cross);
  console.log(circle);

  if (cross == true && data.target.classList == "box") {
    data.target.classList.add("crossClicked");
    winning();
    return (cross = false), (circle = true);
  } else if (cross == false && data.target.classList == "box") {
    data.target.classList.add("circleClicked");
    console.log((data.target.value = "O"));
    winning();
    return (cross = true), (circle = false);
  } else if (
    (cross == true && data.target.classList == "box circleClicked") ||
    (cross == true && data.target.classList == "box crossClicked") ||
    (circle == true && data.target.classList == "box circleClicked") ||
    (circle == true && data.target.classList == "box crossClicked")
  )
    return;
}

function circleWin() {
  if ((player1 = "O")) {
    return alert("Player 1 win");
  } else {
    return alert("Player 2 win ");
  }
}
function crossWin() {
  if ((player1 = "X")) {
    return alert("Player 1 win");
  } else {
    return alert("Player 2 win ");
  }
}

function winning() {
  if (
    (box00.classList.contains("crossClicked") &&
      box01.classList.contains("crossClicked") &&
      box02.classList.contains("crossClicked")) ||
    (box03.classList.contains("crossClicked") &&
      box04.classList.contains("crossClicked") &&
      box05.classList.contains("crossClicked")) ||
    (box06.classList.contains("crossClicked") &&
      box07.classList.contains("crossClicked") &&
      box08.classList.contains("crossClicked")) ||
    (box00.classList.contains("crossClicked") &&
      box03.classList.contains("crossClicked") &&
      box06.classList.contains("crossClicked")) ||
    (box01.classList.contains("crossClicked") &&
      box04.classList.contains("crossClicked") &&
      box07.classList.contains("crossClicked")) ||
    (box02.classList.contains("crossClicked") &&
      box05.classList.contains("crossClicked") &&
      box08.classList.contains("crossClicked")) ||
    (box02.classList.contains("crossClicked") &&
      box04.classList.contains("crossClicked") &&
      box06.classList.contains("crossClicked")) ||
    (box00.classList.contains("crossClicked") &&
      box04.classList.contains("crossClicked") &&
      box08.classList.contains("crossClicked"))
  )
    return crossWin();
  else if (
    (box00.classList.contains("circleClicked") &&
      box01.classList.contains("circleClicked") &&
      box02.classList.contains("circleClicked")) ||
    (box03.classList.contains("circleClicked") &&
      box04.classList.contains("circleClicked") &&
      box05.classList.contains("circleClicked")) ||
    (box06.classList.contains("circleClicked") &&
      box07.classList.contains("circleClicked") &&
      box08.classList.contains("circleClicked")) ||
    (box00.classList.contains("circleClicked") &&
      box03.classList.contains("circleClicked") &&
      box06.classList.contains("circleClicked")) ||
    (box01.classList.contains("circleClicked") &&
      box04.classList.contains("circleClicked") &&
      box07.classList.contains("circleClicked")) ||
    (box02.classList.contains("circleClicked") &&
      box05.classList.contains("circleClicked") &&
      box08.classList.contains("circleClicked")) ||
    (box00.classList.contains("circleClicked") &&
      box04.classList.contains("circleClicked") &&
      box08.classList.contains("circleClicked")) ||
    (box02.classList.contains("circleClicked") &&
      box04.classList.contains("circleClicked") &&
      box06.classList.contains("circleClicked"))
  )
    return circleWin();
}

/*
function checkWinner() {
  let roundWon = false;
  console.log(roundWon);

  for (let i = 0; i < combinaison.length; i++) {
    const condition = combinaison[i];
    console.log(condition);
    const boxA = board[condition[0]];
    const boxB = board[condition[1]];
    const boxC = board[condition[2]];
    console.log(boxA);
    console.log(boxB);
    console.log(boxC);

    if (boxA == "" || boxB == "" || boxC == "") {
      continue;
    }
    if (boxA == boxB && boxB == boxC) {
      console.log(roundWon);
      roundWon = true;
      break;
    }
    console.log(roundWon);
  }
}

checkWinner();
*/
/*************************************AddEventListener************************************/

//for each button
box.forEach((element) => {
  element.addEventListener("click", (data) => {
    gameDisplay(data);
  });
});

//choose the cross (starter page)
chooseCross.addEventListener("click", (e) => {
  cross = true;
  circle = false;
  player01 = "X";
  choiceCross();
});

//choose the circle (starter page)
chooseCircle.addEventListener("click", (e) => {
  cross = false;
  circle = true;
  player01 = "O";
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
restart.addEventListener("click", () => {
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
