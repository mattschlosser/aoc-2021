const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('15');
let string = buffer.toString();
// let [lines, instructions ] = string.split('\n\n');
lines = string.split('\n').filter(e => e != '').map(e => e.split('').map(e => +e));
console.table(lines);

let i = 0;
let j = 0;
let goalI = lines.length - 1;
let goalJ = lines[0].length - 1;
let steps = 0;
let max = 0;
let totalCost = 0;
// create a graph of the map
let getCost = (i, j) => {
    return lines[i][j];
}
let graph = {};
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        let node = {
            id: [i, j],
            cost: getCost(i, j),
            g: getCost(i, j),
            h: goalJ - j + goalI - i,
            neighbours: []
        };
        graph[node.id.join('-')] = node;
    }
}
let getNeighbourKeys = (i, j) => {
    let keys = [];
    if (i > 0) keys.push([i - 1, j].join('-'));
    if (i < goalI) keys.push([i + 1, j].join('-'));
    if (j > 0) keys.push([i, j - 1].join('-'));
    if (j < goalJ) keys.push([i, j + 1].join('-'));
    return keys;
}
for (let key in graph) {
    let node = graph[key];
    let nks = getNeighbourKeys(...node.id);
    for (let nk of nks) {
        let neighbour = graph[nk];
        node.neighbours.push(neighbour);
    }
}
// console.log(graph);
// exit();

let openList = [graph['0-0']];
let closedList = [];
let total = 0;
while (openList.length > 0) {
    let current = openList.shift();
    closedList.push(current);
    let neighbours = current.neighbours.filter(e => !closedList.includes(e));
    // console.log(neighbours);
    for (let i = 0; i < neighbours.length; i++) {
        let neighbour = neighbours[i];
        if (neighbour.id[0] == goalI && neighbour.id[1] == goalJ) {
            neighbour.parent = current;
            total = current.g + neighbour.cost;
            console.log(total);
            // show the path back
            let path = [neighbour];
            let curr = neighbour;
            while (curr.parent) {
                path.push(curr.parent);
                curr = curr.parent;
            }
            path.reverse();
            console.table(path);
            exit();
        }
        let g = current.g + neighbour.cost;
        let h = goalJ - neighbour.id[1] + goalI - neighbour.id[0];
        let f = g + h;
        if (!openList.includes(neighbour) || neighbour.f > f)  {
            neighbour.parent = current;
            neighbour.g = g;
            neighbour.h = h;
            neighbour.f = f;
            openList.push(neighbour);
        }
        // console.log(neighbour.id, neighbour.g, neighbour.h, neighbour.f);
    }
    openList.sort((a, b) => a.f - b.f);
    // console.table(openList);
    // break;
    closedList.push(current);
}


// console.log(getCost(0,0));