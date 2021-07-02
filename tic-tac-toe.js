//  DOESN'T MARK WITH CURRENTPLAYER SYMBOL FROM STORAGE

// DOES PLAYER VARIABLE PULL UPDATED VALUE WHEN USED

// GAMEOVER -> NO SQUARE CAN BE HOVERED OR CLICKED AND EMPHASIZE NEW GAME BUTTON

// NOT FINDING WINS FROM GAMEARRAY IN STORAGE UNTIL AFTER PRESSING NEW GAME

// GAMESTATE LOOKS LIKE IT IS RESET BUT AFTER MARKING, OLD VALUES COME BACK, DOUBLE CLICKING NEW GAME BUTTON OR REFRESH DOES RESET


window.onload = () => {
  window.localStorage.clear();
  let gameState = ['', '', '', '', '', '', '', '', ''];
  localStorage.setItem("gameState", JSON.stringify(gameState));
  localStorage.setItem("currentPlayer", "x");
  localStorage.setItem("gameOver", "false");
  takeTurn();

  clickNewGame()
  clickGiveUp()
}


let MESSAGE = document.getElementById("headingDiv");
let PLAYER = localStorage.getItem("currentPlayer");
let GAMEARRAY = JSON.parse(localStorage.getItem("gameState"));
let GAMEOVER = localStorage.getItem("gameOver");


function takeTurn() {
  if (!isBoardFull()) {
    markClickedSquares()
    findWinner()
    if (!GAMEOVER && isBoardFull()) endGame("cat");
    if (!GAMEOVER && !isBoardFull()) takeTurn();
  }
};

function switchPlayer() {
  if (PLAYER === "o") {
    localStorage.setItem("currentPlayer", "x");
    MESSAGE.innerText = "It is x's turn";
  } else {
    localStorage.setItem("currentPlayer", "o");
    MESSAGE.innerText = "It is o's turn";
  }
};

function markClickedSquares() {
  let img;
  let squares = document.querySelectorAll("div.square");
  for (let square of squares) {
    square.addEventListener("click", mark => {
      if (!square.innerHTML) {
        console.log(localStorage.getItem("currentPlayer"));
        if (PLAYER === "x") img = "<img src='./assets/x-marker.svg'/>";
        if (PLAYER === "o") img = "<img src='./assets/o-marker.svg'/>";
        square.innerHTML = img;
        square.setAttribute("class", "marked")
        markGameArray(square)
        console.log(GAMEARRAY);
        switchPlayer();
      } else {
        MESSAGE.innerText = "Pick an empty spot";
      }
    })
  }
};


function markGameArray(square) {
  if (square.id === "topLeft") GAMEARRAY[0] = PLAYER;
  if (square.id === "topMiddle") GAMEARRAY[1] = PLAYER;
  if (square.id === "topRight") GAMEARRAY[2] = PLAYER;
  if (square.id === "centerLeft") GAMEARRAY[3] = PLAYER;
  if (square.id === "centerMiddle") GAMEARRAY[4] = PLAYER;
  if (square.id === "centerRight") GAMEARRAY[5] = PLAYER;
  if (square.id === "bottomLeft") GAMEARRAY[6] = PLAYER;
  if (square.id === "bottomMiddle") GAMEARRAY[7] = PLAYER;
  if (square.id === "bottomRight") GAMEARRAY[8] = PLAYER;
  localStorage.setItem("gameState", JSON.stringify(GAMEARRAY));
}

function findWinner() {
  // horizontal wins
  if (((GAMEARRAY[0] === GAMEARRAY[1]) && (GAMEARRAY[1] === GAMEARRAY[2])) && (GAMEARRAY[0] !== "")) {
    endGame(GAMEARRAY[0]);
  } else if (((GAMEARRAY[3] === GAMEARRAY[4]) && (GAMEARRAY[4] === GAMEARRAY[5])) && (GAMEARRAY[3] !== "")) {
    endGame(GAMEARRAY[3]);
  } else if (((GAMEARRAY[6] === GAMEARRAY[7]) && (GAMEARRAY[7] === GAMEARRAY[8])) && (GAMEARRAY[6] !== "")) {
    endGame(GAMEARRAY[6]);
  }
  // vertical wins
  else if (((GAMEARRAY[0] === GAMEARRAY[3]) && (GAMEARRAY[3] === GAMEARRAY[6])) && (GAMEARRAY[0] !== "")) {
    endGame(GAMEARRAY[0]);
  } else if (((GAMEARRAY[1] === GAMEARRAY[4]) && (GAMEARRAY[4] === GAMEARRAY[7])) && (GAMEARRAY[1] !== "")) {
    endGame(GAMEARRAY[1]);
  } else if (((GAMEARRAY[6] === GAMEARRAY[7]) && (GAMEARRAY[7] === GAMEARRAY[8])) && (GAMEARRAY[6] !== "")) {
    endGame(GAMEARRAY[6]);
  }
  // diagonal wins
  else if (((GAMEARRAY[0] === GAMEARRAY[4]) && (GAMEARRAY[4] === GAMEARRAY[8])) && (GAMEARRAY[0] !== "")) {
    endGame(GAMEARRAY[0]);
  } else if (((GAMEARRAY[2] === GAMEARRAY[4]) && (GAMEARRAY[4] === GAMEARRAY[6])) && (GAMEARRAY[2] !== "")) {
    endGame(GAMEARRAY[2]);
  }
}

function isBoardFull() {
  for (let spot of GAMEARRAY) {
    if (spot === "") return false;
  }
  return true;
}

function endGame(winner) {
  if (winner === "o" || winner === "x") {
    MESSAGE.innerText = "And the winner is... " + winner;
  } else {
    MESSAGE.innerText = "It's a tie";
  }
  localStorage.setItem("gameOver", "true");
}

function clickNewGame() {
  let newGameButton = document.getElementById("newGameButton");
  newGameButton.addEventListener("click", e => {
    location.reload();
    // localStorage.removeItem("gameState");
    // localStorage.removeItem("currentPlayer");
    // localStorage.removeItem("gameOver");
  });
}

function clickGiveUp() {
  let giveUpButton = document.getElementById("giveUpButton");
  giveUpButton.addEventListener("click", e => {
    if (PLAYER === "o") {
      MESSAGE = "Forfeit by o, so x wins!"
    } else {
      MESSAGE = "Forfeit by x, so o wins!"
    }
  });
}
