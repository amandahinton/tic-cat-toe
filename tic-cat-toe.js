let game = {
  gameState: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  gameOver: false,
  winner: false,
};

window.onload = () => {
  enableSquares();
  enableNewGame();
};

function switchPlayer() {
  let message = document.getElementById("headingDiv");
  if (game.currentPlayer === "O") {
    game.currentPlayer = "X";
    message.innerText = "It is X's turn";
  } else {
    game.currentPlayer = "O";
    message.innerText = "It is O's turn";
  }
}

function enableSquares() {
  let squares = document.querySelectorAll("div.square");
  for (let square of squares) {
    square.addEventListener("click", (e) => {
      if (game.gameOver) return; // don't listen if game is over

      if (!square.innerHTML) {
        // if square is available
        square.innerHTML =
          game.currentPlayer === "X"
            ? "<img class='cat' src='./x-cat.png'/>"
            : "<img class='cat' src='./o-cat.png'/>";

        square.setAttribute("class", "marked"); // remove hoverablility on square

        markGameArray(square.id);

        findWinner();

        if (!game.gameOver) switchPlayer();
      } else {
        let message = document.getElementById("headingDiv");
        message.innerText = "Pick an empty spot";
      }
    });
  }
}

function markGameArray(id) {
  const squares = [
    "topLeft",
    "topMiddle",
    "topRight",
    "centerLeft",
    "centerMiddle",
    "centerRight",
    "bottomLeft",
    "bottomMiddle",
    "bottomRight",
  ];
  const position = squares.indexOf(id);
  game.gameState[position] = game.currentPlayer;
}

function findWinner() {
  // horizontal wins
  for (let i = 0; i < 9; i += 3) {
    if (
      game.gameState[i] === game.gameState[i + 1] &&
      game.gameState[i + 1] === game.gameState[i + 2] &&
      game.gameState[i] !== ""
    ) {
      endGame(game.gameState[i]);
    }
  }

  // vertical wins
  for (let i = 0; i < 3; i++) {
    if (
      game.gameState[i] === game.gameState[i + 3] &&
      game.gameState[i + 3] === game.gameState[i + 6] &&
      game.gameState[i] !== ""
    ) {
      endGame(game.gameState[i]);
    }
  }

  // diagonal wins
  if (
    game.gameState[0] === game.gameState[4] &&
    game.gameState[4] === game.gameState[8] &&
    game.gameState[0] !== ""
  ) {
    endGame(game.gameState[0]);
  } else if (
    game.gameState[2] === game.gameState[4] &&
    game.gameState[4] === game.gameState[6] &&
    game.gameState[2] !== ""
  ) {
    endGame(game.gameState[2]);
  }

  // tie if board is full and no winner
  if (!game.gameOver && isBoardFull()) endGame("cat");
}

function isBoardFull() {
  return !game.gameState.includes("");
}

function endGame(winner) {
  game.gameOver = true;
  game.winner = winner;
  let message = document.getElementById("headingDiv");

  if (winner === "O" || winner === "X") {
    message.innerText = winner + " wins!";
  } else {
    message.innerText = "It's a tie";
  }

  stopGamePlay();
}

function stopGamePlay() {
  let squares = document.querySelectorAll("div.square");
  for (let square of squares) {
    square.setAttribute("class", "marked");
  } // no square is hoverable
}

function enableNewGame() {
  let newGameButton = document.getElementById("newGameButton");
  newGameButton.addEventListener("click", (e) => {
    location.reload();
  });
}
