const fs = require('fs');
let buffer = fs.readFileSync('13');
let string = buffer.toString();
let [lines, instructions ] = string.split('\n\n');
let dots = lines.split('\n').filter(e => e != '');
instructions = instructions.split('\n').filter(e => e != '');
let graph = {};

for (let dot of dots) {
    graph[dot] = true;
}

let gotFirst = false;
for (let instruction of instructions) {
    let [dir, lineToFold] = instruction.split(' ').pop().split('=');
    lineToFold = +lineToFold;
    for (let key in graph) {
        let [x, y] = key.split(',').map(e => +e);

        if (dir == 'x') {
            if (x > lineToFold) {
                delete graph[key];
                let difference =  x  - lineToFold;
                let newKey = `${lineToFold - difference},${y}`;
                graph[newKey] = true;
            }
        }
        if (dir == 'y') {
            if (y > lineToFold) {
                delete graph[key];
                let difference = y - lineToFold
                let newKey = `${x},${lineToFold - difference}`;
                graph[newKey] = true;
            }
        }
    }
    if (!gotFirst) {
        console.log(Object.keys(graph).length);
        gotFirst = true;
    }
}

let maxX = 0;
let maxY = 0;
for (let key in graph) {
    let [x, y] = key.split(',').map(e => +e);
    if (x > maxX) {
        maxX = x;
    }
    if (y > maxY) {
        maxY = y;
    }
}
// create an array
let grid = [];
for (let i = 0; i <= maxY; i++) {
    grid[i] = new Array(maxX + 1).fill('.');
}
// for each true value, mark with dot
for (let key in graph) {
    let [x, y] = key.split(',').map(e => +e);
    grid[y][x] = '#';
}
// print the graph
for (let i = 0; i <= maxY; i++) {
    console.log(grid[i].join(''));
}