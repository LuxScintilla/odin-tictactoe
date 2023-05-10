const startButton = document.querySelector(".start-btn");
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
  const cell = document.querySelectorAll(".cell");

  let turn = 1;

  markArray = ["", "", "", "", "", "", "", "", ""];

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
      } else if (
        cell[winCombo[i][0]].textContent === "O" &&
        cell[winCombo[i][1]].textContent === "O" &&
        cell[winCombo[i][2]].textContent === "O"
      ) {
        console.log("Player 2 is the Winner!");
      } else if (!markArray.includes("")) {
        console.log("It is a TIE!");
      }
    }
  }

  function placeMarker() {
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", function () {
        if (cell[i].textContent === "" && turn === 1) {
          cell[i].textContent = playerOne.mark;
          markArray[i] = playerOne.mark;
          checkCombo();
          turn = 2;
        } else if (cell[i].textContent === "" && turn === 2) {
          cell[i].textContent = playerTwo.mark;
          markArray[i] = playerTwo.mark;
          checkCombo();
          turn = 1;
        }
      });
    }
  }

  return { placeMarker };
})();

gameBoard.placeMarker();
