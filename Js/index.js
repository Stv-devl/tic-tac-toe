//variables
const starter = document.getElementById("starter");
const game = document.getElementById("game");
const chooseCross = document.getElementById("chooseCross");
const chooseCircle = document.getElementById("chooseCircle");
const crossTurn = document.querySelector(".cross-turn");
const circleTurn = document.querySelector(".circle-turn");
const restart = document.getElementById("restart");
const box = document.querySelectorAll(".box");
const overlay = document.querySelector(".overlay");
const quitPopup = document.querySelector(".quit-popup");
const popup = document.getElementById("popup");
const circleWin = document.querySelector(".circle-win");
const crossWin = document.querySelector(".cross-win");
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
let board = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
let VsComputer, player01;
let playerSign = "X";

/*************************************functions************************************/

/******************Starter page**************************/

// Function to launch when the starter page is open (game starter page). activate start page, player1 choose circle
function pageLaunch() {
  starter.classList.add("activate");
  chooseCircle.classList.add("circleActive");
  player01 = "O";
}
pageLaunch();

//Player 1 have to choose the cross or the circle
function playerChoice() {
  if (player01 == "X") {
    chooseCross.classList.add("crossActive");
    chooseCircle.classList.remove("circleActive");
    return numberOfPlayer();
  } else {
    chooseCross.classList.remove("crossActive");
    chooseCircle.classList.add("circleActive");
    return numberOfPlayer();
  }
}

//fonction to see player type of game choice (1player against Comp, or 2 players and choise X or O of player 1 )
function numberOfPlayer() {
  if (player01 == "X" && VsComputer == true) {
    playerLeft.textContent = "X (You)";
    playerRight.textContent = "0 (CPU)";
    return start();
  } else if (player01 == "O" && VsComputer == true) {
    playerLeft.textContent = "X (CPU)";
    playerRight.textContent = "0 (You)";
    return start();
  } else if (player01 == "X" && VsComputer == false) {
    playerLeft.textContent = "X (P1)";
    playerRight.textContent = "0 (P2)";
    return start();
  } else if (player01 == "O" && VsComputer == false) {
    playerLeft.textContent = "X (P2)";
    playerRight.textContent = "0 (P1)";
    return start();
  } else {
    alert = "Error";
  }
}

//fonction to launch the Game page
function start() {
  starter.classList.remove("activate");
  game.classList.add("launch");
  crossTurn.classList.add("turnActive");
  //computer play X at start
  computerXfirstPlay();
}

/******************game page**************************/

// when we click on 1 of the box
function boxClicked() {
  const boxIndex = this.getAttribute("boxIndex");

  //multiplayers
  if (board[boxIndex] == undefined && VsComputer == false) {
    updateBox(this, boxIndex);
    checkWinner();
    //vsCpu player01=X
  } else if (
    board[boxIndex] == undefined &&
    VsComputer == true &&
    player01 == "X" &&
    playerSign == "X"
  ) {
    computerPlay();
    updateBox(this, boxIndex);
    changePlayer();
    checkWinner();
    //vsCpu player01=O
  } else if (
    board[boxIndex] == undefined &&
    VsComputer == true &&
    player01 == "O" &&
    playerSign == "O"
  ) {
    computerPlay();
    updateBox(this, boxIndex);
    changePlayer();
    checkWinner();
  }
}
//the computer choose a random number from 0 to 8 for play
const computerPlay = () => {
  const boxrandom = [00, 01, 02, 03, 04, 05, 06, 07, 08];
  let random = Math.floor(Math.random() * boxrandom.length);
  let value = boxrandom[random];

  setTimeout(function () {
    if (
      box[value].classList == "box" &&
      popup.classList != "result-popup activatePopup"
    ) {
      displayCpuSvg(value);
      board[value] = playerSign; // add computer play to board
      checkWinner();
      return changePlayer();
    } else if (
      box[value].classList != "box" &&
      popup.classList != "result-popup activatePopup"
    ) {
      return computerPlay(); // if number is already clicked so launch the function again
    } else return;
  }, 500);
};

// for Vscomputer game if player01 = "O" computer start to play. Here computer always play the same but it could be a random box also.
function computerXfirstPlay() {
  if (player01 == "O" && VsComputer == true) {
    setTimeout(function () {
      if (VsComputer == true && player01 == "O") {
        box00.classList.add("crossClicked");
        board[0] = playerSign; // add computer play to board
      }
      return changePlayer();
    }, 300);
  }
}

//display circle or cross on box
function displayCpuSvg(value) {
  if (playerSign == "O" && player01 == "X")
    return box[value].classList.add("circleClicked");
  else if (playerSign == "X" && player01 == "O")
    return box[value].classList.add("crossClicked");
}

//the board index will be X or O + launch Svg display
function updateBox(element, index) {
  board[index] = playerSign;
  displaySvg(element);
}

//add cross and circle Svg at click
function displaySvg(element) {
  if (playerSign == "X" && VsComputer == false)
    return element.classList.add("crossClicked");
  else if (playerSign == "O" && VsComputer == false)
    return element.classList.add("circleClicked");
  else if (playerSign == "X" && player01 == "X" && VsComputer == true)
    return element.classList.add("crossClicked");
  else if (playerSign == "O" && player01 == "O" && VsComputer == true)
    return element.classList.add("circleClicked");
}

//change X to O after each turn and display the turn
function changePlayer() {
  playerSign = playerSign == "X" ? "O" : "X";

  if (playerSign == "X") {
    crossTurn.classList.add("turnActive");
    circleTurn.classList.remove("turnActive");
    return;
  } else {
    circleTurn.classList.add("turnActive");
    crossTurn.classList.remove("turnActive");
  }
  return;
}

//check if winning combinaison match
function checkWinner() {
  let won = false;
  for (let i = 0; i < combinaison.length; i++) {
    const condition = combinaison[i];
    let aBox = board[condition[0]];
    let bBox = board[condition[1]];
    let cBox = board[condition[2]];

    console.log(aBox, bBox, cBox);

    if (aBox == undefined || bBox == undefined || cBox == undefined) {
      continue;
    }
    if (aBox == bBox && bBox == cBox) {
      won = true;
      displayWinner(aBox, bBox, cBox);

      break;
    }
  }
  if (won == true) {
    overlay.classList.add("activating");
    popup.classList.add("activatePopup");
    won = false;
  } else if (!board.includes(undefined)) {
    overlay.classList.add("activating");
    popup.classList.add("activatePopup");
    displayDraw();
    displayScoreTies();
  } else return multiOrCpu();
}

// if multiplayers whe change player sign else nothing
function multiOrCpu() {
  if (VsComputer == false) return changePlayer();
  else return;
}

//display the winner popup
function displayWinner(aBox, bBox, cBox) {
  if (
    player01 == "O" &&
    VsComputer == true &&
    aBox == "O" &&
    bBox == "O" &&
    cBox == "O"
  ) {
    activateCircle();
    youWon();
    displayScoreCircle();
  } else if (
    player01 == "O" &&
    VsComputer == true &&
    aBox == "X" &&
    bBox == "X" &&
    cBox == "X"
  ) {
    activateCross();
    youLost();
    changeColor();
    displayScoreCross();
  } else if (
    player01 == "X" &&
    VsComputer == true &&
    aBox == "X" &&
    bBox == "X" &&
    cBox == "X"
  ) {
    activateCross();
    changeColor();
    youWon();
    displayScoreCross();
  } else if (
    player01 == "X" &&
    VsComputer == true &&
    aBox == "O" &&
    bBox == "O" &&
    cBox == "O"
  ) {
    activateCircle();
    youLost();
    displayScoreCircle();
  } else if (
    player01 == "O" &&
    VsComputer == false &&
    aBox == "O" &&
    bBox == "O" &&
    cBox == "O"
  ) {
    activateCircle();
    player1Win();
    displayScoreCircle();
  } else if (
    player01 == "O" &&
    VsComputer == false &&
    aBox == "X" &&
    bBox == "X" &&
    cBox == "X"
  ) {
    activateCross();
    changeColor();
    player2Win();
    displayScoreCross();
  } else if (
    player01 == "X" &&
    VsComputer == false &&
    aBox == "X" &&
    bBox == "X" &&
    cBox == "X"
  ) {
    activateCross();
    changeColor();
    player1Win();
    displayScoreCross();
  } else if (
    player01 == "X" &&
    VsComputer == false &&
    aBox == "O" &&
    bBox == "O" &&
    cBox == "O"
  ) {
    activateCircle();
    player2Win();
    displayScoreCircle();
  }
}
//popup change//
//change color of takeTheRound
function changeColor() {
  takeTheRound.style.color = "hsla(178, 60%, 48%, 1)";
}
//activate circle
function activateCircle() {
  circleWin.classList.add("logoActivate");
}
//activate cross
function activateCross() {
  crossWin.classList.add("logoActivate");
}
//display text "you won"
function youWon() {
  resultDisplay.textContent = "you won!";
}
//display text "oh no you lost"
function youLost() {
  resultDisplay.textContent = "oh no, you lost...";
}
//display text "player 1 win"
function player1Win() {
  resultDisplay.textContent = "player 1 wins!";
}
//display text "player 2 win"
function player2Win() {
  resultDisplay.textContent = "player 2 wins!";
}
//display the drow popup
function displayDraw() {
  resultDisplay.textContent = "";
  takeTheRound.textContent = "round tied";
  takeTheRound.style.color = "hsla(199, 24%, 73%, 1)";
}

/*************display score***************/
//display the score at each turn
function displayScoreCross() {
  scoreCross.textContent = ++scoreCross.textContent;
}
//display the score at each turn
function displayScoreTies() {
  scoreTies.textContent = ++scoreTies.textContent;
}
//display the score at each turn
function displayScoreCircle() {
  scoreCircle.textContent = ++scoreCircle.textContent;
}

//Next round => reset element to play new turn
function launchNextRound() {
  //remove overlay & popup
  overlay.classList.remove("activating");
  popup.classList.remove("activatePopup");
  //remove box SVG, board array and put start playersign at X
  box.forEach((box) => {
    box.classList.remove("circleClicked", "crossClicked");
  });
  board = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  //first player will be "X"
  playerSign = "X";
  //cross & circle popup logo remove,
  circleWin.classList.remove("logoActivate");
  crossWin.classList.remove("logoActivate");
  takeTheRound.style.color = " hsla(39, 88%, 58%, 1)";
  takeTheRound.textContent = "take the round";
  //cross & circle turn remove
  crossTurn.classList.add("turnActive");
  circleTurn.classList.remove("turnActive");
  //when player01=0 & Vcomputer = true => Computer will play at new game
  computerXfirstPlay();
}

//reset page by reload => go to stater page
function reset() {
  window.location.reload();
}

/*************************************AddEventListener************************************/

//for each button (page game)
box.forEach((element) => {
  element.addEventListener("click", boxClicked);
});

//choose the cross (starter page)
chooseCross.addEventListener("click", () => {
  player01 = "X";
  playerChoice();
});

//choose the circle (starter page)
chooseCircle.addEventListener("click", () => {
  player01 = "O";
  playerChoice();
});

//play against CPU (starter page)
vsCpu.addEventListener("click", () => {
  VsComputer = true;

  numberOfPlayer();
});

//play against an other player (starter page)
players.addEventListener("click", () => {
  VsComputer = false;
  numberOfPlayer();
});

//restart button (game page)
restart.addEventListener("click", () => {
  overlay.classList.add("activating");
  quitPopup.classList.add("cancelPopup");
});

//quit button (popup) for quit game or not
quit.addEventListener("click", () => {
  reset();
});

//cancel reset game
cancel.addEventListener("click", () => {
  overlay.classList.remove("activating");
  quitPopup.classList.remove("cancelPopup");
});

//comfirm reset game
quitGame.addEventListener("click", () => {
  reset();
});

nextRound.addEventListener("click", () => {
  launchNextRound();
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
