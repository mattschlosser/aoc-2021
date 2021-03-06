const fs = require('fs');
let buffer = fs.readFileSync('12');
let string = buffer.toString();
let lines = string.split('\n').filter(e => e != '').map(e => e.split('-').map(e => e));

let graph = {};

for (let line of lines) {
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
// console.log(findAPath(graph, 'start', 'end'));
visit = (node, visited, part = 1) => {
    let possiblePaths = [];
    if (node == 'end') {
        return [[node]];
    }
    for (let neighbour of graph[node]) {
        if (!visited[neighbour]) {
            morePossiblePaths = visit(neighbour, {...visited, [node]: true}, part);
            for (let path of morePossiblePaths) {
                possiblePaths.push([node, ...path]);
            }
            // if we are visiting a node that can be visited twice, 
            // do not add it to the visited list
            if (node.toUpperCase() == node) {
                morePossiblePaths = visit(neighbour, {...visited}, part);
                for (let path of morePossiblePaths) {
                    possiblePaths.push([node, ...path]);
                }
            }
        } 
    }
    if (part == 2) {
        for (let neighbour of graph[node]) {
            if (node.toUpperCase() != node) {
                let v = {...visited};
                delete v[node];
                morePossiblePaths = visit(neighbour, v, 1);
                for (let path of morePossiblePaths) {
                    processedPath = path.filter(e => e == e.toLowerCase());
                    possiblePaths.push([node, ...path]);
                }
            }
        }
    }
    return possiblePaths
}
let paths = visit('start', {});
let x = new Set(paths.map(e => e.join(',')))
console.log(x.size);
let paths2 = visit('start', {}, 2);
let comparer = paths2.map(e => e.filter(e => e.toLowerCase() == e));
let finalPaths = paths2.filter((e,i) => comparer[i].length - (new Set(comparer[i])).size < 2).map(e => e.join(','))
let x2 = new Set(finalPaths);
console.log(x2.size);