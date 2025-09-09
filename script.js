const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let running = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // cols
  [0,4,8], [2,4,6]            // diagonals
];

cells.forEach(cell => {
  cell.addEventListener("click", cellClicked);
});

restartBtn.addEventListener("click", restartGame);

function cellClicked() {
  const index = Array.from(cells).indexOf(this);

  if (this.classList.contains("taken") || !running) {
    return;
  }

  this.textContent = currentPlayer;
  this.classList.add("taken");

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    running = false;
  } else if ([...cells].every(cell => cell.classList.contains("taken"))) {
    statusText.textContent = "😲 It's a Draw!";
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function restartGame() {
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player X's turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}