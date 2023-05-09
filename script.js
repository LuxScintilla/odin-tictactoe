const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", showGame);

function showGame() {
  document.querySelector(".game-container").style.display = "grid";
  startButton.style.display = "none";
}

const gameBoard = (function () {
  const cell = document.querySelectorAll(".cell");

  const CreatePlayer = function (name, mark, color) {
    this.name = name;
    this.mark = mark;
    this.color = color;
  };
  const playerOne = new CreatePlayer("Player 1", "X", "#ff3c7d");
  const playerTwo = new CreatePlayer("Player 2", "O", "#00ebcb");

  turn = 1;

  let boardArray = ["", "", "", "", "", "", "", "", ""];

  const winCombo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const checkWin = function () {
    for (let i = 0; i < cell.length; i++) {
      if (TO BE CONTINUED HERE!!!!) {
        
      }
    }
  };

  const placeMarker = function () {
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", function () {
        if (cell[i].textContent === "" && turn === 1) {
          cell[i].style.color = playerOne.color;
          cell[i].textContent = playerOne.mark;
          boardArray[i] = playerOne.mark;
          turn = 2;
        } else if (cell[i].textContent === "" && turn === 2) {
          cell[i].style.color = playerTwo.color;
          cell[i].textContent = playerTwo.mark;
          boardArray[i] = playerTwo.mark;
          turn = 1;
        }
      });
    }
  };

  return { placeMarker };
})();

gameBoard.placeMarker();
