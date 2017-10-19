/**
 * Created by Oleg Rachitsky on 25.11.2015.
 */

var whosTurn = "one",
    text = document.getElementById("whosTurn"),
    gameField = [],
    gameValues = [],
    overlay = document.getElementById("overlayid"),
    gameObject = {
        one: {
            symbol: 'X',
            turnText: 'The second player\'s turn'
        },
        two: {
            symbol: 'O',
            turnText: 'The first player\'s turn'
        }
    };

init();

function init() {
    var nodeList = document.querySelectorAll(".game-cell");
    whosTurn = "one";
    text.innerText = "The first player's turn";
    for (var i = 0; i < 3; i++) {
        gameField[i] = [];
        gameValues[i] = [];
    }
    for (i = 0; i < nodeList.length; i++) {
        nodeList[i].addEventListener("click", clicked);
        nodeList[i].innerText = "";
        gameField[Math.floor(i / 3)][i % 3] = nodeList[i];
        gameValues[Math.floor(i / 3)][i % 3] = 0;
    }
    overlay.style.display = "none";
}

function checkMyHardcode() {
    var i;
    var j;
    for(i = 0; i < 3; i++){
        var rowSum = 0;
        for(j = 0; j < 3; j++){
            rowSum += gameValues[i][j];
        }
        if(rowSum === 3)
            return 1;
        else if(rowSum === -3)
            return -1
    }

    for(i = 0; i < 3; i++){
        var colSum = 0;
        for(j = 0; j < 3; j++){
            colSum += gameValues[j][i];
        }
        if(colSum === 3)
            return 1;
        else if(colSum === -3)
           return -1;
    }

    if(gameValues[0][0] + gameValues[1][1] + gameValues[2][2] === 3)
        return 1;
    else if(gameValues[0][0] + gameValues[1][1] + gameValues[2][2] === -3)
       return -1;

    if(gameValues[2][0] + gameValues[1][1] + gameValues[0][2] === 3)
        return 1;
    else if(gameValues[2][0] + gameValues[1][1] + gameValues[0][2] === -3)
       return -1;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            console.log(gameValues[i][j]);
            if (gameValues[i][j] === 0) return;
        }
    }
    return -2;
}

function clicked() {
    if (!this.innerText) {
        text.innerText = gameObject[whosTurn].turnText;
        this.innerText = gameObject[whosTurn].symbol;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (gameField[i][j] === this) {
                    gameValues[i][j] = whosTurn === "one" ? 1 : -1;
                }
            }
        }
        whosTurn = whosTurn === "one" ? "two" : "one";
        var whoWon = checkMyHardcode();
        if (whoWon === 1) {
            overlay.style.display = "block";
            overlay.firstChild.innerText = "Player X wins!\nClick to continue";
        } else if (whoWon === -1) {
            overlay.style.display = "block";
            overlay.firstChild.innerText = "Player O wins!\nClick to continue";
        } else if (whoWon === -2) {
            overlay.style.display = "block";
            overlay.firstChild.innerText = "Draw!\nClick to continue";
        }
    }
}
