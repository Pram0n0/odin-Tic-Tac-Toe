const gameboard = (() => {
    const rows = 3;
    const columns = 3;
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push([])
        }
    }

    const getBoard = () => board;

    const isEmpty = (x, y) => Array.isArray(board[x][y])

    const addMarker = (x,y, player) => {
        if (isEmpty(x,y)) {
            board[x][y] = player.marker;
            return true;
        } else {
            return false;
        }
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = [];
            }
        }
    };

    return { getBoard, addMarker, resetBoard }
})();

function isBoardFull() {
    const board = gameboard.getBoard();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (Array.isArray(board[i][j])) {
                return false;
            }
        }
    }
    return true;
}

function createPlayer (name, player) {
    if (player == 1) {
        marker = "X"
    } else if (player == 2) {
        marker = "O"
    } else {
        marker = null
    }
    return { name, marker }
}

function determineStartingPlayer(Player1, Player2) {
    const number = Math.ceil(Math.random() * 2);

    switch (number) {
        case 1:
            return Player1;
        case 2:
            return Player2;
    }
}

function printBoard() {
    const board = gameboard.getBoard();
    console.log("Current Board:");
    for (let i = 0; i < board.length; i++) {
        console.log(board[i].join(" | "));
    }
}

function checkForWinner() {
    const board = gameboard.getBoard();

    const checkLine = (a, b, c) => a !== "" && a === b && b === c;

    // check rows and columns
    for (let i = 0; i < 3; i++) {
        if (checkLine(board[i][0], board[i][1], board[i][2]) ||
            checkLine(board[0][i], board[1][i], board[2][i])) {
            return true;
        }
    }
    
    // check diagonals
    if (checkLine(board[0][0], board[1][1], board[2][2]) ||
        checkLine(board[0][2], board[1][1], board[2][0])) {
        return true;
    }

    return false;
}


document.addEventListener('DOMContentLoaded', function() {
    const boardElement = document.querySelector('.board');
    const startBtn = document.querySelector('.start_game');
    const resetBtn = document.querySelector('.reset_game');

    let currentPlayer;
    let gameEnd = false;

    let Player1
    let Player2

    function initializeGame() {
        gameEnd = false;

        const playerOneName = prompt("Player 1: ")
        const playerTwoName = prompt("Player 2: ")
        
        Player1 = createPlayer(playerOneName, 1);
        Player2 = createPlayer(playerTwoName, 2);
    
        console.log(`Player 1: ${Player1.name}, Marker: ${Player1.marker}`);
        console.log(`Player 2: ${Player2.name}, Marker: ${Player2.marker}`);

        currentPlayer = determineStartingPlayer(Player1, Player2);
        startingTurnDisplay();
        renderBoard();
    }

    function startingTurnDisplay() {
        console.log(`${currentPlayer.name} starts first.`);
    }

    function updateTurnDisplay() {
        console.log(`${currentPlayer.name}'s turn.`);
    }


    function renderBoard() {
        const board = gameboard.getBoard();
        boardElement.innerHTML = '';
    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.column = j;
                cell.addEventListener('click', playRound);
    
                // Check if the cell is not empty before setting the marker
                if (board[i][j] && board[i][j].marker) {
                    cell.textContent = board[i][j].marker;
                }
                boardElement.appendChild(cell);
            }
        }
        printBoard();
    }

    function playRound(event) {
        if (!gameEnd) {
            const row = parseInt(event.target.dataset.row);
            const column = parseInt(event.target.dataset.column);
            if (gameboard.addMarker(row, column, currentPlayer)) {
                renderBoard();
                if (checkForWinner()) {
                    gameEnd = true;
                    console.log(`${currentPlayer.name} wins!`);
                } else if (isBoardFull()) {
                    gameEnd = true;
                    console.log("It's a tie!");
                } else {
                    currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
                    updateTurnDisplay();
                }
            }
        }
    }

    function resetGame() {
        gameboard.resetBoard();
        initializeGame();
    }

    startBtn.addEventListener('click', initializeGame); 
    resetBtn.addEventListener('click', resetGame);
});