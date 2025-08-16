const startBtn = document.querySelector(".start-screen button");
const startScreen = document.querySelector(".start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const winnerText = document.getElementById("winner");

let player1Name, player2Name, player1Symbol, currentPlayer;
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

startBtn.addEventListener("click", () => {
    player1Name = document.querySelector("input[name='player1Name']").value || "Player 1";
    player2Name = document.querySelector("input[name='player2Name']").value || "Player 2";
    player1Symbol = document.getElementById("player1symbol").value;
    currentPlayer = player1Symbol;

    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    createBoard();
    updateTurnInfo();
});

function createBoard() {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.addEventListener("click", () => handleCellClick(index, cellDiv));
        boardDiv.appendChild(cellDiv);
    });

    gameScreen.appendChild(boardDiv);
}

function handleCellClick(index, cellDiv) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cellDiv.textContent = currentPlayer;

    if (checkWin()) {
        endGame(`${getCurrentPlayerName()} wins!`);
    } else if (board.every(cell => cell !== "")) {
        endGame("It's a draw!");
    } else {
        currentPlayer = currentPlayer === "x" ? "o" : "x";
        updateTurnInfo();
    }
}

function updateTurnInfo() {
    document.getElementById("turn-info").textContent = `Turn: ${getCurrentPlayerName()} (${currentPlayer.toUpperCase()})`;
}

function getCurrentPlayerName() {
    return currentPlayer === player1Symbol ? player1Name : player2Name;
}

function checkWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winPatterns.some(pattern => 
        board[pattern[0]] &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[1]] === board[pattern[2]]
    );
}

function endGame(message) {
    gameActive = false;
    gameScreen.style.display = "none";
    endScreen.style.display = "block";
    winnerText.textContent = message;
    endScreen.querySelector("button").addEventListener("click", resetGame);
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    endScreen.style.display = "none";
    gameScreen.innerHTML = `<h2 id="roung-info">Round 1 of 3</h2>
                            <p id="turn-info"></p>
                            <p id="score"></p>`;
    gameScreen.style.display = "block";
    createBoard();
    updateTurnInfo();
}
