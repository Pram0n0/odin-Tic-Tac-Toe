const gameboard = (function () {
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

    const empty = (x,y) => board[x][y] === "";

    const addMarker = (x,y, player) => {
        if (empty(x,y)) {
            board[x][y] = player.marker;
            return true;
        } else {
            return false;
        }
    };

    return { getBoard, addMarker }
})();

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

function gameController() {
    playerOneName = prompt("Player 1: ")
    playerTwoName = prompt("Player 2: ")
    
    const Player1 = createPlayer(playerOneName, 1);
    const Player2 = createPlayer(playerTwoName, 2);
    players = [Player1, Player2]
    console.log(`Player 1: ${Player1.name}, Marker: ${Player1.marker}`);
    console.log(`Player 2: ${Player2.name}, Marker: ${Player2.marker}`);

    const startingPlayer = determineStartingPlayer(Player1, Player2);
    console.log(`${startingPlayer.name} starts first`)

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

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