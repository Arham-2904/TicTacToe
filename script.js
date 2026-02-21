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
        gameBoard.placeMark(i, turn.marker);
        console.log(`${turn.name} plays at index ${i}`);
        switchTurns();
    }

    return {player1, player2, switchTurns, play};
})();