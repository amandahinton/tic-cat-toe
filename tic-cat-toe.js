const game = {
  gameState: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  gameOver: false,
  winner: false,
  onePlayer: false,
};

const SQUARES = [
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

window.onload = () => {
  enableSquares();
  enableNewGame();
  enablePlayerToggle();
};

function switchPlayer() {
  const message = document.getElementById("headingDiv");
  if (game.currentPlayer === "O") {
    game.currentPlayer = "X";
    message.innerText = "It is X's turn";
  } else {
    game.currentPlayer = "O";
    message.innerText = "It is O's turn";
  }
}

function enableSquares() {
  const squares = document.querySelectorAll("div.square");
  for (let square of squares) {
    square.addEventListener("click", (e) => {
      if (game.gameOver) return; // don't listen if game is over

      const playerToggle = document.getElementById("playerToggle");
      playerToggle.setAttribute("class", "hidden"); // hide button after first mark

      if (!square.innerHTML) {
        // if square is available
        square.innerHTML =
          game.currentPlayer === "X"
            ? "<img class='cat' src='./x-cat.png'/>"
            : "<img class='cat' src='./o-cat.png'/>";

        square.setAttribute("class", "marked"); // remove hoverablility on square

        markGameArray(square.id);

        findWinner();

        if (!game.gameOver) {
          switchPlayer();
          if (game.onePlayer) {
            const container = document.getElementById("container");
            container.setAttribute("class", "locked");

            setTimeout(() => {
              takeComputerTurn();
              container.removeAttribute("class", "locked");
            }, 500);
          }
        }
      } else {
        const message = document.getElementById("headingDiv");
        message.innerText = "Pick an empty spot";
      }
    });
  }
}

function takeComputerTurn() {
  const availableSpots = [];
  for (let i in game.gameState) {
    if (!game.gameState[i]) {
      availableSpots.push(i);
    }
  }

  const randomSpot = Math.floor(Math.random() * availableSpots.length);
  const computerPlay = availableSpots[randomSpot];

  game.gameState[computerPlay] = "O";

  markBoard(computerPlay);

  findWinner();

  if (!game.gameOver) switchPlayer();
}

function markBoard(index) {
  const squareId = SQUARES[index];
  const square = document.getElementById(squareId);
  square.innerHTML = "<img class='cat' src='./o-cat.png'/>";
  square.setAttribute("class", "marked");
}

function markGameArray(id) {
  const position = SQUARES.indexOf(id);
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
  const squares = document.querySelectorAll("div.square");
  for (let square of squares) {
    square.setAttribute("class", "marked");
  } // no square is hoverable
}

function enableNewGame() {
  const newGameButton = document.getElementById("newGameButton");
  newGameButton.addEventListener("click", (e) => {
    location.reload();
  });
}

function enablePlayerToggle() {
  const playerToggle = document.getElementById("playerToggle");
  playerToggle.addEventListener("click", (e) => {
    game.onePlayer = !game.onePlayer;
    playerToggle.innerText = game.onePlayer
      ? "Switch to Two-Player"
      : "Switch to One-Player";
  });
}
