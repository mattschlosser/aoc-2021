const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('1');
let string = buffer.toString();
let items = string.split('\n\n');
let i = 0;

function movAvg(items) {
    let sum =  items.reduce((a,e) => a+ (+e),0);
    return sum;
}
for (let item of items) {
    let depths = string.split('\n')
    
    for (let depth in depths) {
        if (depths[depth].length == 0) {
            continue;
        }
        if (+depths[depth] > +depths[depth-1]) {
            i++;
        }
    }
    console.log(i);
    i = 0;
    for (let depth in depths) {
        if (depth == 0 || depth == 1 || depth == 2 || depth == 3) {
            continue;
        }
        let y = depths.slice(depth-3, depth);
        let x = depths.slice(depth-4, depth-1);
        if (movAvg(y) > movAvg(x)) {
            i++;
        }
    }
}
console.log(i);