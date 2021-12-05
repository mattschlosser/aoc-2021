const fs = require('fs');
let buffer = fs.readFileSync('5');
let string = buffer.toString();
let lines = string.split('\n');

// this function takes a list of lines (x1,y1 -> x2,y2), and a function isHit, and returns the number
// of lines that were hit more than once
let greaterThanTwo = (lines, isHit) => {
    let hits = {};
    for (let line of lines) {
        let [x1, y1, x2, y2] = line.split(/,| -> /).map(e => +e);
        for (let x = x1, i = 0; x1 <= x2 ? x <= x2 : x >= x2; x1 <= x2 ? x++ : x--, i++) {
            for (let y = y1, j = 0; y1 <= y2 ? y <= y2: y >= y2; y1 <= y2 ? y++ : y--, j++) {       
                if (isHit(x1,x2,y1,y2,i,j)) {
                    hits[`${x},${y}`] = (hits[`${x},${y}`] || 0) + 1;
                }
            }
        }
    }
    // get the number of hits greater or equal to 2
    let k = Object.keys(hits).filter(key => hits[key] >= 2).length;
    return k
}

// part 1 
console.log(greaterThanTwo(lines, (x1,x2,y1,y2) => x1 === x2 || y1 === y2));


// part 2
console.log(greaterThanTwo(lines, (x1,x2,y1,y2,i,j) => x1 === x2 || y1 === y2 || i === j));


