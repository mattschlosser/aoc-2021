const fs = require('fs');
let buffer = fs.readFileSync('4');
let string = buffer.toString();
let boards = string.split('\n\n');
let numbers = boards.shift().split(',');

let index = {};
for (let number in numbers) {
    let n = numbers[number];
    index[n] = number;
}

// transform a space and line sepearted array to a 2d array
let toBoardArray = board => board.split('\n').map(e => e.trim().split(/\s+/)).filter(e => e != '');

let getWinningBoard = (boards) => {
    let minMaxIndex = 0;
    let minMaxCalledAt = 100;
    for (let boardIndex in boards) {
        let board = boards[boardIndex];
        let boardArray = toBoardArray(board);
        for (let rowIndex in boardArray) {
            let row = boardArray[rowIndex];
            let maxCalledAt = row.map(k => index[k]).reduce((a,b) => Math.max(a,b));
            if (maxCalledAt < minMaxCalledAt) {
                minMaxCalledAt = maxCalledAt;
                minMaxIndex = boardIndex; // winning board
            }
        }
        for (let i = 0; i < boardArray.length; i++) {
            let maxCalledAt = 0;
            for (let j = 0; j < boardArray[i].length; j++) {
                maxCalledAt = Math.max(maxCalledAt, index[boardArray[j][i]]);
            }
            if (maxCalledAt < minMaxCalledAt) {
                minMaxCalledAt = maxCalledAt;
                minMaxIndex = boardIndex; // winning board
            }
        }
    }
    return [minMaxCalledAt, minMaxIndex];
}

// given a number and the total number of numbers called so far, return true if n has been called
let hasBeenCalled = (n, lastCalledIndex) => {
    return index[n] <= lastCalledIndex
}

// given a row and the last number it was called at, return the sum of all the numbers that have not been called yet
let rowSum = (row, minMaxCalledAt) => row.reduce((a,n) => !hasBeenCalled(n, minMaxCalledAt) ? a + (+n) : a, 0);

// given a board and the last number it was called at, return the sum of all the numbers that have not been called yet
let answer = (board, minMaxCalledAt) => {
    let boardArray = toBoardArray(board);
    let boardSum = boardArray.map(row => rowSum(row, minMaxCalledAt)).reduce((a,b) => a + b, 0);
    return boardSum * numbers[minMaxCalledAt];
}

// part 1
let [minMaxCalledAt, minMaxIndex] = getWinningBoard(boards);
console.log(`Part one asnwer is ${answer(boards[minMaxIndex], minMaxCalledAt)}`);

// part 2
while (boards.length > 1) {
    // recurisvely eliminate boards until only one is left
    boards.splice(minMaxIndex, 1);
    [minMaxCalledAt, minMaxIndex] = getWinningBoard(boards);
}
console.log(`Part two asnwer is ${answer(boards[0], minMaxCalledAt)}`);


