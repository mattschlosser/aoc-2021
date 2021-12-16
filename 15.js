const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('15');
let string = buffer.toString();
// let [lines, instructions ] = string.split('\n\n');
lines = string.split('\n').filter(e => e != '').map(e => e.split('').map(e => +e));
// console.table(lines);

let goalI = lines.length - 1;
let goalJ = lines[0].length - 1;
// create a graph of the map
let generateGraph = (lines) => {
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
    return graph;
}
let solveGraph = (graph) => {
    let openList = [graph['0-0']];
    openListIndex = {'0-0': true};
    let closedList = [];
    let total = 0;
    while (openList.length > 0) {
        let current = openList.shift();
        delete openListIndex[current.id.join('-')];
        closedList.push(current);
        let neighbours = current.neighbours.filter(e => !closedList.includes(e));
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];
            if (neighbour.id[0] == goalI && neighbour.id[1] == goalJ) {
                neighbour.parent = current;
                total = current.g + neighbour.cost;
                // show the path back
                let path = [neighbour];
                let curr = neighbour;
                while (curr.parent) {
                    path.push(curr.parent);
                    curr = curr.parent;
                }
                path.reverse();
                return total - path[0].cost;
            }
            let g = current.g + neighbour.cost;
            let h = goalJ - neighbour.id[1] + goalI - neighbour.id[0];
            let f = g + h;
            let id = neighbour.id.join('-');
            if (!openListIndex[id] || neighbour.f > f)  {
                neighbour.parent = current;
                neighbour.g = g;
                neighbour.h = h;
                neighbour.f = f;
                if (!openListIndex[id]) {
                    openListIndex[id] = true;
                    openList.push(neighbour);
                }
            }
        }
        openList.sort((a, b) => a.f - b.f);
        closedList.push(current);
    }
}
let expandMap = (lines) => {
    let expanded = Array(lines.length * 5);
    for (let i = 0; i < lines.length* 5; i++) {
        expanded[i] = Array(lines[0].length * 5);
    }
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            let node = lines[i][j];
            for (let k = 0; k < 5; k++) {
                for (let l = 0; l < 5; l++) {
                    expanded[k * lines[i].length + i][l * lines[j].length + j] = ((node + k + l - 1) % 9) + 1;
                }
            }
        }
    }
    return expanded;
}
console.log(solveGraph(generateGraph(lines)));
goalI = lines.length * 5 - 1;
goalJ = lines[0].length * 5 - 1;
let newGraph = expandMap(lines);
console.log('graph has been expanded');
console.log(solveGraph(generateGraph(newGraph)));