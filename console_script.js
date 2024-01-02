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

    const isEmpty = (x,y) => board[x][y] === "";

    const addMarker = (x,y, player) => {
        if (isEmpty(x,y)) {
            board[x][y] = player.marker;
            return true;
        } else {
            return false;
        }
    };

    return { getBoard, addMarker }
})();

function isBoardFull() {
    const board = gameboard.getBoard();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === "") {
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

function playRound(player) {
    printBoard();
    console.log(`${player.name}'s turn.`);

    let row, column;
    do {
        row = prompt("Enter row (1, 2, or 3): ");
        column = prompt("Enter column (1, 2, or 3): ");
    } while (!gameboard.addMarker(row - 1, column - 1, player));

    if (checkForWinner()) {
        printBoard();
        console.log(`${player.name} wins!`);
        return true;
    } else if (isBoardFull()) {
        printBoard();
        console.log("It's a tie!");
        return true;
    }

    return false;
}

function gameController() {
    const playerOneName = prompt("Player 1: ")
    const playerTwoName = prompt("Player 2: ")
    
    const Player1 = createPlayer(playerOneName, 1);
    const Player2 = createPlayer(playerTwoName, 2);

    console.log(`Player 1: ${Player1.name}, Marker: ${Player1.marker}`);
    console.log(`Player 2: ${Player2.name}, Marker: ${Player2.marker}`);

    const startingPlayer = determineStartingPlayer(Player1, Player2);
    console.log(`${startingPlayer.name} starts first`)

    let activePlayer = startingPlayer;

    let gameEnd = false;

    while (!gameEnd) {
        gameEnd = playRound(activePlayer);
        activePlayer = activePlayer === Player1 ? Player2 : Player1;
    }
}

gameController();