const startButton = document.querySelector(".start-btn");
const LogoContainer = document.querySelector(".logo-wrap");

const modal = document.querySelector(".modal");
const submitNames = document.querySelector(".submit-names");
const cancelButton = document.querySelector(".cancel");

const p1Input = document.querySelector(".p1-input");
const p2Input = document.querySelector(".p2-input");

const p1Score = document.querySelector(".p1-score");
const p2Score = document.querySelector(".p2-score");

const winModal = document.querySelector(".win-modal");
const winMessage = document.querySelector(".win-message");
const continueButton = document.querySelector(".continue");

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
  playerOne = new CreatePlayer(p1Input.value, "X", "#ff3c7d", 0);
  playerTwo = new CreatePlayer(p2Input.value, "O", "#00ebcb", 0);
  playerController.displayNames();
  showGame();
});
continueButton.addEventListener("click", function () {
  gameBoard.resetGame();
  winModal.close();
});

function showGame() {
  document.querySelector(".game-container").style.display = "grid";
  startButton.classList.add("start-btn-hidden");
  LogoContainer.style.display = "none";
}

const CreatePlayer = function (name, mark, color, score) {
  this.name = name;
  this.mark = mark;
  this.color = color;
  this.score = score;
};
let playerOne;
let playerTwo;

const playerController = (function () {
  // const playerOne = new CreatePlayer(p1Input.value, "X", "#ff3c7d", 0);
  // const playerTwo = new CreatePlayer(p2Input.value, "O", "#00ebcb", 0);

  function displayNames() {
    document.querySelector(".p1-name").textContent = p1Input.value;
    document.querySelector(".p2-name").textContent = p2Input.value;
  }

  function updateScore() {
    p1Score.textContent = playerOne.score;
    p2Score.textContent = playerTwo.score;
  }

  return { displayNames, updateScore };
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
        playerOne.score += 1;
        winMessage.textContent = `${playerOne.name} won this round!`;
        revealWin(winCombo[i]);
      } else if (
        cell[winCombo[i][0]].textContent === "O" &&
        cell[winCombo[i][1]].textContent === "O" &&
        cell[winCombo[i][2]].textContent === "O"
      ) {
        playerTwo.score += 1;
        winMessage.textContent = `${playerTwo.name} won this round!`;
        revealWin(winCombo[i]);
      } else if (!boardArray.includes("")) {
        winMessage.textContent = "It is a TIE!";
        winModal.showModal();
      }
    }
  }

  function revealWin(array) {
    array.forEach((item) => {
      cell[item].classList.add("winning-cell");
    });
    gameFinished = true;
    playerController.updateScore();
    winModal.showModal();
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

  function resetScore() {
    playerOne.score = 0;
    playerTwo.score = 0;
  }

  function quitGame() {
    resetGame();
    document.querySelector(".game-container").style.display = "none";
    startButton.classList.remove("start-btn-hidden");
    LogoContainer.style.display = "flex";
  }

  return { resetGame, resetScore, quitGame, placeMarker };
})();

resetButton.addEventListener("click", function () {
  gameBoard.resetGame();
  gameBoard.resetScore();
  playerController.updateScore();
});
quitButton.addEventListener("click", gameBoard.quitGame);

gameBoard.placeMarker();
