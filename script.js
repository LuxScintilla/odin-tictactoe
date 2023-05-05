function createPlayer(name, marker) {
  this.name = name;
  this.marker = marker;
}

const playerOne = new createPlayer("Player 1", "X");
const playerTwo = new createPlayer("Player 2", "O");

const playGame = {
  placeMarker: function () {
    const cell = document.querySelectorAll(".board-cell");
    const cellContent = document.querySelectorAll(".content");
    let turn = 1;
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", function () {
        if (turn === 1 && cellContent[i].textContent === "") {
          cellContent[i].textContent = playerOne.marker;
          turn = 2;
        } else if (turn === 2 && cellContent[i].textContent === "") {
          cellContent[i].textContent = playerTwo.marker;
          turn = 1;
        }
      });
    }
  },
};

playGame.placeMarker();
