const gameBoard = (() => {
    let boardArray = ['','','','','','','','',''];

    const placeMark = (i, marker) => {
        boardArray[i] = marker;
    };

    const getBoard = () => boardArray;

    const gameWon = () => {
        if((boardArray[0] === boardArray[1] && boardArray[1] === boardArray[2]) && (boardArray[0] != '' && boardArray[1] != '' && boardArray[2] != '')){
            return true;
        }
        else if((boardArray[3] === boardArray[4] && boardArray[4] === boardArray[5]) && (boardArray[3] != '' && boardArray[4] != '' && boardArray[5] != '')){
            return true;
        }
        else if((boardArray[6] === boardArray[7] && boardArray[7] === boardArray[8]) && (boardArray[6] != '' && boardArray[7] != '' && boardArray[8] != '')){
            return true;
        }
        else if((boardArray[0] === boardArray[3] && boardArray[3] === boardArray[6]) && (boardArray[0] != '' && boardArray[3] != '' && boardArray[6] != '')){
            return true;
        }
        else if((boardArray[1] === boardArray[4] && boardArray[4] === boardArray[7]) && (boardArray[1] != '' && boardArray[4] != '' && boardArray[7] != '')){
            return true;
        }
        else if((boardArray[2] === boardArray[5] && boardArray[5] === boardArray[8]) && (boardArray[2] != '' && boardArray[5] != '' && boardArray[8] != '')){
            return true;
        }
        else if((boardArray[0] === boardArray[4] && boardArray[4] === boardArray[8]) && (boardArray[0] != '' && boardArray[4] != '' && boardArray[8] != '')){
            return true;
        }
        else if((boardArray[2] === boardArray[4] && boardArray[4] === boardArray[6]) && (boardArray[2] != '' && boardArray[4] != '' && boardArray[6] != '')){
            return true;
        }

        return false;
    }

    return {placeMark, getBoard, gameWon};
})();

const Player = (name, marker) => {
    return {name, marker};
};

const Controller = (() => {
    let gameRunning = true;
    const player1 = Player("player1", "O");
    const player2 = Player("player2", "X");

    let turn = player1;

    const switchTurns = () => {
        if(turn === player1){
            turn = player2;
        }
        else{
            turn = player1;
        }
    }

    const play = (i) => {
        if(gameRunning){
            const board = gameBoard.getBoard();
            if(board[i] === ''){
                gameBoard.placeMark(i, turn.marker);
                DisplayGame.render();
                console.log(`${turn.name} plays at index ${i}`);
                let won = gameBoard.gameWon();
                if(won){
                    DisplayGame.result("won", turn.name);
                    gameRunning = false;
                }
                if(!won){
                    switchTurns();
                }
                if(!board.includes('') && !won){
                    DisplayGame.result("draw", turn.name);
                    gameRunning = false;
                }
            }
        }
    }

    return {player1, player2, switchTurns, play};
})();

const DisplayGame = (() => {
    const render = () => {
        const board = gameBoard.getBoard();
        const boxes = document.getElementsByClassName("box");
        
        for(let i = 0; i <= 8; i++){
            boxes[i].textContent = board[i];
        }
    }

    const click = () => {
        const boxes = document.getElementsByClassName("box");
        for(let i = 0; i <= 8; i++){
            boxes[i].addEventListener("click", function(){
                Controller.play(i);
            })
        }
    }

    const result = (message, player) => {
        const outcome = document.getElementById("result");
        if(message === 'won'){
            outcome.textContent = `${player} has won the game`;
        }
        if(message === 'draw'){
            outcome.textContent = "It's a draw";
        }
    }

    return {render, click, result};
})();

DisplayGame.click();