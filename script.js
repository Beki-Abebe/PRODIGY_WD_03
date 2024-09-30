// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

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

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== "" || !isGameActive) {
        return;
    }

    updateCell(cell, index);
    checkWinner();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
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
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = `Game is a draw!`;
        isGameActive = false;
        return;
    }

    switchPlayer();
}

function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

statusText.textContent = `Player ${currentPlayer}'s turn`;
