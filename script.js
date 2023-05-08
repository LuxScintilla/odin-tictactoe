const modal = document.querySelector(".modal-container");

document.querySelector(".mp-button").addEventListener("click", function () {
  modal.style.display = "flex";
});
document.querySelector(".exit").addEventListener("click", function () {
  modal.style.display = "none";
});
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.querySelector(".submit-names").addEventListener("click", function (e) {
  e.preventDefault();
  clearPage();
  showGame();
  assignNames();
});

function assignNames() {
  const player1 = document.querySelector(".p1-input").value;
  const player2 = document.querySelector(".p2-input").value;
  const playerOne = new createPlayer(player1, "X");
  const playerTwo = new createPlayer(player2, "O");
}

function clearPage() {
  modal.style.display = "none";
  document.querySelector(".sp-button").style.display = "none";
  document.querySelector(".mp-button").style.display = "none";
  document.querySelector(".shape-container").style.display = "none";
}

function showGame() {
  const board = document.querySelector(".board-container");
  board.style.transform = "translateY(0px)";
  board.style.opacity = "1";
}

function createPlayer(name, marker) {
  this.name = name;
  this.marker = marker;
}

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
