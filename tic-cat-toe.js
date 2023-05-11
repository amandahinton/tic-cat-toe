window.onload = () => {
  window.localStorage.clear();
  let gameState = ['', '', '', '', '', '', '', '', ''];
  localStorage.setItem("gameState", JSON.stringify(gameState));
  localStorage.setItem("currentPlayer", "x");
  localStorage.setItem("gameOver", "no");
  localStorage.setItem("winner", "no");
  markClickedSquares()
  clickNewGame();
  clickGiveUp();
}

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
  for (let square of squares) {

    square.addEventListener("click", e => {
      let gameOver = localStorage.getItem("gameOver");
      if(gameOver === "yes") return; // don't listen if game is over

      if (!square.innerHTML) { // if the clicked square is empty
        let player = localStorage.getItem("currentPlayer");
        if (player === "x") {
          // img = "<img src='./public/x-marker.svg'/>"; // x-character
          img = "<img class='cat' src='./public/x-cat.png'/>"; // x-cat
        } else {
          // img = "<img src='./public/o-marker.svg'/>"; // o-character
          img = "<img class='cat' src='./public/o-cat.png'/>"; // o-cat
        }
        square.innerHTML = img; // mark the browswer game board
        square.setAttribute("class", "marked") // remove hoverablility on square
        markGameArray(square) // mark the local storage game state array

        findWinner(); // use game state to check for winner

        let gameOver = localStorage.getItem("gameOver"); // keep playing
        if (gameOver === "no") switchPlayer();

      } else { // if square already marked
        let message = document.getElementById("headingDiv");
        message.innerText = "Pick an empty spot";
      }

    });


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
};

function findWinner() {
  let gameArray = JSON.parse(localStorage.getItem("gameState"));
  // horizontal wins
  for (let i = 0; i < 9; i += 3) {
    if (((gameArray[i] === gameArray[i+1]) && (gameArray[i+1] === gameArray[i+2])) && (gameArray[i] !== "")) {
      endGame(gameArray[i]);
    }
  }
  // vertical wins
  for (let i = 0; i < 3; i++) {
    if (((gameArray[i] === gameArray[i + 3]) && (gameArray[i + 3] === gameArray[i + 6])) && (gameArray[i] !== "")) {
      endGame(gameArray[i]);
    }
  }
  // diagonal wins
  if (((gameArray[0] === gameArray[4]) && (gameArray[4] === gameArray[8])) && (gameArray[0] !== "")) {
    endGame(gameArray[0]);
  } else if (((gameArray[2] === gameArray[4]) && (gameArray[4] === gameArray[6])) && (gameArray[2] !== "")) {
    endGame(gameArray[2]);
  }
  // board is full + no winner = tie
  let gameOver = localStorage.getItem("gameOver");
  if (gameOver === "no" && isBoardFull()) endGame("cat");
};

function isBoardFull() {
  let gameArray = JSON.parse(localStorage.getItem("gameState"));
  for (let spot of gameArray) {
    if (spot === "") return false;
  }
  return true;
};

function endGame(winner) {
  localStorage.setItem("gameOver", "yes");
  localStorage.setItem("winner", winner);
  let message = document.getElementById("headingDiv");
  if (winner === "o" || winner === "x") {
    message.innerText = "And the winner is... " + winner;
  } else {
    message.innerText = "It's a tie";
  }
  stopGamePlay();
};

function stopGamePlay() {
  let squares = document.querySelectorAll("div.square");
  for (let square of squares) {
    square.setAttribute("class", "marked");
  } // no square is hoverable
  let giveUpButton = document.getElementById("giveUpButton");
  giveUpButton.setAttribute("class", "disabled");
};

function clickNewGame() {
  let newGameButton = document.getElementById("newGameButton");
  newGameButton.addEventListener("click", e => {
    location.reload();
  });
};

function clickGiveUp() {
  let giveUpButton = document.getElementById("giveUpButton");
  giveUpButton.addEventListener("click", e => {
    let message = document.getElementById("headingDiv");
    localStorage.setItem("gameOver", "yes");
    let player = localStorage.getItem("currentPlayer");
    if (player === "o") {
      message.innerText = "Forfeit by o, so x wins!";
    } else if (player === "x") {
      message.innerText = "Forfeit by x, so o wins!";
    }
    stopGamePlay();
  });
};
