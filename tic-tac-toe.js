//  REMOVE GLOBAL VARIABLES AND MOVE INTO FUNCTIONS
    //  DOESN'T MARK WITH CURRENTPLAYER SYMBOL FROM STORAGE
    // DOES PLAYER VARIABLE PULL UPDATED VALUE WHEN USED
    // NOT FINDING WINS FROM GAMEARRAY IN STORAGE UNTIL AFTER PRESSING NEW GAME

// GAMEOVER -> NO SQUARE CAN BE HOVERED OR CLICKED AND EMPHASIZE NEW GAME BUTTON

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

function takeTurn() {
  let gameOver = localStorage.getItem("gameOver");
  if (!isBoardFull()) {
    markClickedSquares()
    findWinner()
    if (!gameOver && isBoardFull()) endGame("cat");
    if (!gameOver && !isBoardFull()) takeTurn();
  }
};

function switchPlayer() {
  let message = document.getElementById("headingDiv");
  let player = localStorage.getItem("currentPlayer");
  if (player === "o") {
    localStorage.setItem("currentPlayer", "x");
    message.innerText = "It is x's turn";
  } else {
    localStorage.setItem("currentPlayer", "o");
    message.innerText = "It is o's turn";
  }
};

function markClickedSquares() {
  let img;
  let squares = document.querySelectorAll("div.square");
  let player = localStorage.getItem("currentPlayer");
  for (let square of squares) {
    square.addEventListener("click", mark => {
      if (!square.innerHTML) {
        if (player === "x") img = "<img src='./assets/x-marker.svg'/>";
        if (player === "o") img = "<img src='./assets/o-marker.svg'/>";
        square.innerHTML = img;
        square.setAttribute("class", "marked")
        markGameArray(square)
        switchPlayer();
      } else {
        let message = document.getElementById("headingDiv");
        message.innerText = "Pick an empty spot";
      }
    })
  }
};


function markGameArray(square) {
  let player = localStorage.getItem("currentPlayer");
  let gameArray = JSON.parse(localStorage.getItem("gameState"));
  if (square.id === "topLeft") gameArray[0] = player;
  if (square.id === "topMiddle") gameArray[1] = player;
  if (square.id === "topRight") gameArray[2] = player;
  if (square.id === "centerLeft") gameArray[3] = player;
  if (square.id === "centerMiddle") gameArray[4] = player;
  if (square.id === "centerRight") gameArray[5] = player;
  if (square.id === "bottomLeft") gameArray[6] = player;
  if (square.id === "bottomMiddle") gameArray[7] = player;
  if (square.id === "bottomRight") gameArray[8] = player;
  localStorage.setItem("gameState", JSON.stringify(gameArray));
}

function findWinner() {
  let gameArray = JSON.parse(localStorage.getItem("gameState"));
  // horizontal wins
  if (((gameArray[0] === gameArray[1]) && (gameArray[1] === gameArray[2])) && (gameArray[0] !== "")) {
    endGame(gameArray[0]);
  } else if (((gameArray[3] === gameArray[4]) && (gameArray[4] === gameArray[5])) && (gameArray[3] !== "")) {
    endGame(gameArray[3]);
  } else if (((gameArray[6] === gameArray[7]) && (gameArray[7] === gameArray[8])) && (gameArray[6] !== "")) {
    endGame(gameArray[6]);
  }
  // vertical wins
  else if (((gameArray[0] === gameArray[3]) && (gameArray[3] === gameArray[6])) && (gameArray[0] !== "")) {
    endGame(gameArray[0]);
  } else if (((gameArray[1] === gameArray[4]) && (gameArray[4] === gameArray[7])) && (gameArray[1] !== "")) {
    endGame(gameArray[1]);
  } else if (((gameArray[6] === gameArray[7]) && (gameArray[7] === gameArray[8])) && (gameArray[6] !== "")) {
    endGame(gameArray[6]);
  }
  // diagonal wins
  else if (((gameArray[0] === gameArray[4]) && (gameArray[4] === gameArray[8])) && (gameArray[0] !== "")) {
    endGame(gameArray[0]);
  } else if (((gameArray[2] === gameArray[4]) && (gameArray[4] === gameArray[6])) && (gameArray[2] !== "")) {
    endGame(gameArray[2]);
  }
}

function isBoardFull() {
  let gameArray = JSON.parse(localStorage.getItem("gameState"));
  for (let spot of gameArray) {
    if (spot === "") return false;
  }
  return true;
}

function endGame(winner) {
  let message = document.getElementById("headingDiv");
  if (winner === "o" || winner === "x") {
    message.innerText = "And the winner is... " + winner;
  } else {
    message.innerText = "It's a tie";
  }
  localStorage.setItem("gameOver", "true");
}

function clickNewGame() {
  let newGameButton = document.getElementById("newGameButton");
  newGameButton.addEventListener("click", e => {
    location.reload();
  });
}

function clickGiveUp() {
  let message = document.getElementById("headingDiv");
  let player = localStorage.getItem("currentPlayer");
  let giveUpButton = document.getElementById("giveUpButton");
  giveUpButton.addEventListener("click", e => {
    if (player === "o") {
      message = "Forfeit by o, so x wins!"
    } else {
      message = "Forfeit by x, so o wins!"
    }
  });
}
