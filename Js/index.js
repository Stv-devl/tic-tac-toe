//variables
const starter = document.getElementById("starter");
const game = document.getElementById("game");
const chooseCross = document.getElementById("chooseCross");
const chooseCircle = document.getElementById("chooseCircle");
const restart = document.getElementById("restart");
const box = document.querySelectorAll(".box");
const overlay = document.querySelector(".overlay");
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
let board = ["", "", "", "", "", "", "", "", ""];
let mutliplayers, VsComputer, player01;
let playerSign = "X";

/*************************************functions************************************/
/******************Starter page**************************/

// Function to launch when the starter page is open (game starter page)
function pageLaunch() {
  starter.classList.add("activate");
  chooseCircle.classList.add("circleActive");
  player01 = "O";
}
pageLaunch();

//Player 1 choose the cross or the circle
function playerChoice() {
  if (player01 == "X") {
    chooseCross.classList.add("crossActive");
    chooseCircle.classList.remove("circleActive");
    numberOfPlayer();
  } else {
    chooseCross.classList.remove("crossActive");
    chooseCircle.classList.add("circleActive");
    numberOfPlayer();
  }
  return;
}

//fonction to activate the Game page
function start() {
  starter.classList.remove("activate");
  game.classList.add("launch");
}

//fonction to see player type of game choice
function numberOfPlayer() {
  if ((player01 = "X" && VsComputer == true)) {
    playerLeft.textContent = "X (You)";
    playerRight.textContent = "0 (CPU)";
    start();
  } else if ((player01 = "O" && VsComputer == true)) {
    playerLeft.textContent = "X (CPU)";
    playerRight.textContent = "0 (You)";
    start();
  } else if ((player01 = "X" && mutliplayers == true)) {
    playerLeft.textContent = "X (P1)";
    playerRight.textContent = "0 (P2)";
    start();
  } else if ((player01 = "O" && mutliplayers == true)) {
    playerLeft.textContent = "X (P2)";
    playerRight.textContent = "0 (P1)";
    start();
  } else {
    alert = "Error";
  }
  return;
}

/******************game page**************************/

// to increment the boxIndex value in the board array.
function boxClicked() {
  const boxIndex = this.getAttribute("boxIndex");

  if (board[boxIndex] != "") {
    return;
  }
  updateBox(this, boxIndex);
  checkWinner();
}

//the board index will be X or O
function updateBox(element, index) {
  board[index] = playerSign;
  displayImg(element);
}

//add cross and circle img at click
function displayImg(element) {
  if (playerSign == "X") element.classList.add("crossClicked");
  else {
    element.classList.add("circleClicked");
  }
}
//change X to O after each turn
function changePlayer() {
  playerSign = playerSign == "X" ? "O" : "X";
}

//check if winning combinaison match
function checkWinner() {
  let won = false;
  for (let i = 0; i < combinaison.length; i++) {
    const condition = combinaison[i];
    let a = board[condition[0]];
    let b = board[condition[1]];
    let c = board[condition[2]];

    if (a == "" || b == "" || c == "") {
      continue;
    }
    if (a == b && b == c) {
      won = true;
      break;
    }
  }
  if (won) {
    displayWinner();
  } else if (!board.includes("")) {
    displayDraw();
  } else {
    changePlayer();
  }
}

//display the winner popup
function displayWinner() {
  if (player01 == "O" && playerSign == "O") {
    overlay.classList.add("activating");
  } else if (player01 == "O" && playerSign == "X") {
    overlay.classList.add("activating");
  } else if (player01 == "X" && playerSign == "X") {
    overlay.classList.add("activating");
  } else {
    overlay.classList.add("activating");
  }
}

//display the drow popup
function displayDraw() {
  overlay.classList.add("activating");
}
/*************************************AddEventListener************************************/

//for each button
box.forEach((element) => {
  element.addEventListener("click", boxClicked);
});

//choose the cross (starter page)
chooseCross.addEventListener("click", (e) => {
  player01 = "X";
  playerChoice();
});

//choose the circle (starter page)
chooseCircle.addEventListener("click", (e) => {
  player01 = "O";
  playerChoice();
});

//play against CPU (starter page)
vsCpu.addEventListener("click", () => {
  VsComputer = true;
  mutliplayers = false;
  numberOfPlayer();
});

//play against an other player (starter page)
players.addEventListener("click", () => {
  VsComputer = false;
  mutliplayers = true;
  numberOfPlayer();
});

//restart button (game page)
restart.addEventListener("click", () => {
  window.location.reload();
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
