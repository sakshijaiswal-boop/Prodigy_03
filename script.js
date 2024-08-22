// DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartBtn = document.querySelector('.restart-btn');

// Game variables
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Functions
const handleCellClick = (e) => {
  const clickedCell = e.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[cellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, cellIndex);
  handleResultValidation();
};

const handleCellPlayed = (clickedCell, cellIndex) => {
  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(`cell-${currentPlayer}`);
};

const handlePlayerChange = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
};

const handleResultValidation = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent =` Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

const handleRestartGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('cell-X', 'cell-O');
  });
};

// Event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', handleRestartGame);
statusDisplay.textContent = `Current Player: ${currentPlayer}`;