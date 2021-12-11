const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('11');
let string = buffer.toString();
let lines = string.split('\n').filter(e => e != '').map(e => e.split('').map(e => +e));

let flashCell = (flashed, newLines, total, x, y) => {
    total += 1;
    let line = parseInt(x);
    let cell = parseInt(y);
    let lines = newLines.map(line => line.map(e => e ));
    hasFlashed = flashed.map(line => line.map(e => e ));
    hasFlashed[line][cell] = 1;
    // while 
    // increate all neighbors by one that are not 9

    if (line > 0) {
        lines[line - 1][cell]++;
        if (!hasFlashed[line - 1][cell] && lines[line - 1][cell] > 9) {
            [hasFlashed, lines, total] = flashCell(hasFlashed, lines, total, line - 1, cell);
        }
    }
    if (line < lines.length - 1) {
        lines[line + 1][cell]++;
        if (!hasFlashed[line + 1][cell] && lines[line + 1][cell] > 9) {
            [hasFlashed, lines, total] = flashCell(hasFlashed, lines, total, line + 1, cell);
        }
    }
    if (cell > 0) {
        lines[line][cell - 1]++;
        if (!hasFlashed[line][cell - 1] && lines[line][cell - 1] > 9) {
            [hasFlashed, lines, total] = flashCell(hasFlashed, lines, total, line, cell - 1);
        }
    }
    if (cell < lines[line].length - 1) {
        lines[line][cell + 1]++;
        if (!hasFlashed[line][cell + 1] && lines[line][cell + 1] > 9) {
            [hasFlashed, lines, total] = flashCell(hasFlashed, lines, total, line, cell + 1);
        }
    }

    // diagonals
    if (line > 0 && cell > 0) {
        lines[line - 1][cell - 1]++;
        if (!hasFlashed[line - 1][cell - 1] && lines[line - 1][cell - 1] > 9) {
            [hasFlashed, lines, total] = flashCell(hasFlashed, lines, total, line - 1, cell - 1);
        }
    }
    if (line > 0 && cell < lines[line].length - 1) {
        lines[line - 1][cell + 1]++;
        if (!hasFlashed[line - 1][cell + 1] && lines[line - 1][cell + 1] > 9) {
            [hasFlashed, lines, total] = flashCell(hasFlashed, lines, total, line - 1, cell + 1);
        }
    }
    if (line < lines.length - 1 && cell > 0) {
        lines[line + 1][cell - 1]++;
        if (!hasFlashed[line + 1][cell - 1] && lines[line + 1][cell - 1] > 9) {
            [hasFlashed, lines, total] = flashCell(hasFlashed, lines, total, line + 1, cell - 1);
        }
    }
    if (line < lines.length - 1 && cell < lines[line].length - 1) {
        lines[line + 1][cell + 1]++;
        if (!hasFlashed[line + 1][cell + 1] && lines[line + 1][cell + 1] > 9) {
            [hasFlashed, lines, total] = flashCell(hasFlashed, lines, total, line + 1, cell + 1);
        }
    }

    return [hasFlashed, lines, total];
}

let gainEnergy = (lines) => {
    let newLines = lines.map(line => line.map(e => e + 1));
    let hasFlashed = newLines.map(line => line.map(e => 0))
    let total  = 0;
    for (let line in newLines) {
        for (let cell in newLines[line]) {
            let current = newLines[line][cell];
            if (current > 9 && !hasFlashed[line][cell]) {
                [hasFlashed, newLines, total] = flashCell(hasFlashed, newLines, total, line, cell);
            }
        }
    }
    // reset all cells greater or equal to 9 to 0 
    for (let line in newLines) {
        for (let cell in newLines[line]) {
            if (newLines[line][cell] > 9) {
                newLines[line][cell] = 0;
            }
        }
    }
    return [newLines, hasFlashed, total];
}
let solvePartOne = (input) => {
    let lines = input.map(line => line.map(e => +e));
    let total = 0;
    for (let i = 0; i < 100; i++) {
        let [newLines, _, t] = gainEnergy(lines);
        lines = newLines;
        total += +t;
    }
    return total;
}
console.log(solvePartOne(lines));
console.log(solvePartOne(lines));
let solvePartTwo = (input) => {
    let turn = 0;
    let newInput = input.map(line => line.map(e => +e));
    while (true) {
        let [newLines, hasFlashed, total] = gainEnergy(newInput);
        newInput = newLines;
        turn++;
        // if every cell in hasFlashed is 1
        let allFlashed = true;
        for (let line in hasFlashed) {
            for (let cell in hasFlashed[line]) {
                if (!hasFlashed[line][cell]) {
                    allFlashed = false;
                }
            }
        }
        if (allFlashed) {
            return turn;
        }
    }
}
console.log(solvePartTwo(lines));
console.log(solvePartTwo(lines));