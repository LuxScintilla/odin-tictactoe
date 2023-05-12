const startButton = document.querySelector(".start-btn");

const modal = document.querySelector(".modal");
const submitNames = document.querySelector(".submit-names");
const cancelButton = document.querySelector(".cancel");

const p1Input = document.querySelector(".p1-input").value;
const p2Input = document.querySelector(".p2-input").value;

const cell = document.querySelectorAll(".cell");

const resetButton = document.querySelector(".reset-btn");
const quitButton = document.querySelector(".quit-btn");

startButton.addEventListener("click", function () {
  modal.showModal();
});
cancelButton.addEventListener("click", function () {
  modal.close();
});
submitNames.addEventListener("click", function () {
  showGame();
  playerController.displayNames();
});

function showGame() {
  document.querySelector(".game-container").style.display = "grid";
  startButton.classList.add("start-btn-hidden");
}

const CreatePlayer = function (name, mark, color) {
  this.name = name;
  this.mark = mark;
  this.color = color;
};
const playerOne = new CreatePlayer(p1Input, "X", "#ff3c7d");
const playerTwo = new CreatePlayer(p2Input, "O", "#00ebcb");

const playerController = (function () {
  function displayNames() {
    document.querySelector(".p1-name").textContent = playerOne.name;
    document.querySelector(".p2-name").textContent = playerTwo.name;
  }
  return { displayNames };
})();

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
          cell[i].style.color = playerOne.color;
          cell[i].textContent = playerOne.mark;
          boardArray[i] = playerOne.mark;
          checkCombo();
          turn = 2;
        } else if (
          cell[i].textContent === "" &&
          turn === 2 &&
          gameFinished === false
        ) {
          cell[i].style.color = playerTwo.color;
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

  function quitGame() {
    resetGame();
    document.querySelector(".game-container").style.display = "none";
    startButton.classList.remove("start-btn-hidden");
  }

  return { resetGame, quitGame, placeMarker };
})();

resetButton.addEventListener("click", gameBoard.resetGame);
quitButton.addEventListener("click", gameBoard.quitGame);

gameBoard.placeMarker();
