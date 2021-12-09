const fs = require('fs');
let buffer = fs.readFileSync('9');
let string = buffer.toString();
let lines = string.split('\n').filter(e => e != '');

let count = 0;
let board = lines.map(e => e.split(''));
let basinIndex = 0;
let basins = lines.map(e => e.split('').map(e => 0));
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        // check if all four locations are greater htan me
        if ((board[i][j + 1] === undefined || board[i][j] < board[i][j + 1]) && (board[i + 1]?.[j] === undefined || board[i][j] < board[i + 1][j]) && (board[i][j - 1] === undefined || board[i][j] < board[i][j - 1]) && (board[i - 1]?.[j] === undefined || board[i][j] < board[i - 1][j])) {
            count+= +board[i][j]+ 1;
            basinIndex += 1;
            basins[i][j] = basinIndex;
            // while we are at it, mark all neighboards of this board that are not a 9, as being in this basin
            if (board[i][j + 1] !== undefined && board[i][j + 1] !== '9') {
                basins[i][j + 1] = basinIndex;
            }
            if (board[i + 1]?.[j] !== undefined && board[i + 1]?.[j] !== '9') {
                basins[i + 1][j] = basinIndex;
            }
            if (board[i][j - 1] !== undefined && board[i][j - 1] !== '9') {
                basins[i][j - 1] = basinIndex;
            }
            if (board[i - 1]?.[j] !== undefined && board[i - 1]?.[j] !== '9') {
                basins[i - 1][j] = basinIndex;
            }
        }
    }
}

// now just loop until no new basisns are found
let newBasins = true;
while (newBasins) {
    newBasins = false;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (basins[i][j] === 0 && board[i][j] !== '9') {
                if (board[i][j + 1] !== undefined && basins[i][j + 1] !== 0) {
                    basins[i][j] = basins[i][j + 1];
                    newBasins = true;
                }
                if (board[i + 1]?.[j] !== undefined && basins[i + 1]?.[j] !== 0) {
                    basins[i][j] = basins[i + 1][j];
                    newBasins = true;
                }
                if (board[i][j - 1] !== undefined && basins[i][j - 1] !== 0) {
                    basins[i][j] = basins[i][j - 1];
                    newBasins = true;
                }
                if (board[i - 1]?.[j] !== undefined && basins[i - 1]?.[j] !== 0) {
                    basins[i][j] = basins[i - 1][j];
                    newBasins = true;
                }
            }
        }
    }
}

// find the 3 largest basins 
let basinCounts = {};
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (basins[i][j] !== 0) {
            basinCounts[basins[i][j]] = (basinCounts[basins[i][j]] || 0) + 1;
        }
    }
}
// sort basicCounts 
let sortedBasinCounts = Object.keys(basinCounts).sort((a, b) => basinCounts[b] - basinCounts[a]);

// part 1
console.log(count);

// part 2
console.log(sortedBasinCounts.slice(0, 3).map(e => basinCounts[e]).reduce((a,e) => a *e, 1));