const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('12');
let string = buffer.toString();
let lines = string.split('\n').filter(e => e != '').map(e => e.split('-').map(e => e));

let graph = {};

for (let line of lines) {
    console.log(line);
    let [from, to] = line;
    if (!graph[from]) {
        graph[from] = [];
    }
    if (!graph[to]) {
        graph[to] = [];
    }
    if (to != 'start' && from != 'end') 
        graph[from].push(to);

    if (from != 'start' && to != 'end')
        graph[to].push(from);
}
console.log(graph);
let start = graph.start;
let end = graph.end;
let visited = {};
let queue = ['start'];
// let visited = {};
let visits = [];
// find all the differnet ptahs through the graph
findAPath = (graph, start, end) => {
    let visited = {start: true};
    let visits = [];
    // depth first search
    let nodes = graph[start];
    for (let node of nodes) {
        if (!visited[node]) {
            visited[node] = true;
        }
        let paths = findAllPaths(graph, node, end);
    }
    return visits;
}
// console.log(findAPath(graph, 'start', 'end'));
visit = (node, visited) => {
    let possiblePaths = [];
    if (node == 'end') {
        return [[node]];
    }
    for (let neighbour of graph[node]) {
        if (!visited.includes(neighbour)) {
            morePossiblePaths = visit(neighbour, [...visited, node]);
            for (let path of morePossiblePaths) {
                possiblePaths.push([node, ...path]);
            }
            // if we are visiting a node that can be visited twice, 
            // do not add it to the visited list
            if (node.toUpperCase() == node) {
                morePossiblePaths = visit(neighbour, visited);
                for (let path of morePossiblePaths) {
                    possiblePaths.push([node, ...path]);
                }
            }
        }
    }
    return possiblePaths
}
// console.log(visit('end', []));
// console.log(visit('b', ['d']));
// console.log(visit('d', ['b']));
// console.log(visit('A', ['c']));
console.log(visit('start', []));
let paths = visit('start', []);
let x = new Set(paths.map(e => e.join(',')))
console.log(x, x.size);