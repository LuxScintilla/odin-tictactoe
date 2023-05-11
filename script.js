const cell = document.querySelectorAll(".cell");
const startButton = document.querySelector(".start-btn");
const resetButton = document.querySelector(".reset-btn");

startButton.addEventListener("click", showGame);

function showGame() {
  document.querySelector(".game-container").style.display = "grid";
  startButton.style.display = "none";
}

const CreatePlayer = function (name, mark, color) {
  this.name = name;
  this.mark = mark;
  this.color = color;
};
const playerOne = new CreatePlayer("Player 1", "X", "#ff3c7d");
const playerTwo = new CreatePlayer("Player 2", "O", "#00ebcb");

const gameBoard = (function () {
  let turn = 1;

  let gameFinished = false;

  let boardArray = ["", "", "", "", "", "", "", "", ""];

  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkCombo() {
    for (let i = 0; i < winCombo.length; i++) {
      if (
        cell[winCombo[i][0]].textContent === "X" &&
        cell[winCombo[i][1]].textContent === "X" &&
        cell[winCombo[i][2]].textContent === "X"
      ) {
        console.log("Player 1 is the Winner!");
        revealWin(winCombo[i]);
      } else if (
        cell[winCombo[i][0]].textContent === "O" &&
        cell[winCombo[i][1]].textContent === "O" &&
        cell[winCombo[i][2]].textContent === "O"
      ) {
        console.log("Player 2 is the Winner!");
        revealWin(winCombo[i]);
      } else if (!boardArray.includes("")) {
        console.log("It is a TIE!");
      }
    }
  }

  function revealWin(array) {
    array.forEach((item) => {
      cell[item].classList.add("winning-cell");
    });
    gameFinished = true;
  }

  function placeMarker() {
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", function () {
        if (
          cell[i].textContent === "" &&
          turn === 1 &&
          gameFinished === false
        ) {
          cell[i].textContent = playerOne.mark;
          boardArray[i] = playerOne.mark;
          checkCombo();
          turn = 2;
        } else if (
          cell[i].textContent === "" &&
          turn === 2 &&
          gameFinished === false
        ) {
          cell[i].textContent = playerTwo.mark;
          boardArray[i] = playerTwo.mark;
          checkCombo();
          turn = 1;
        }
      });
    }
  }

  function resetGame() {
    turn = 1;
    gameFinished = false;
    boardArray = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < cell.length; i++) {
      cell[i].textContent = "";
      cell[i].classList.remove("winning-cell");
    }
  }
  resetButton.addEventListener("click", resetGame);

  return { resetGame, placeMarker };
})();

gameBoard.placeMarker();
