const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('2');
let string = buffer.toString();
let items = string.split('\n\n');
let i = 0;
let j = 0;

for (let item of items) {
    let depths = string.split('\n')
    for (let depth of depths) {
        let tokens = depth.split(' ');
        depth = +tokens[1];
        if (tokens[0][0] == 'f') {
            i+=depth;
        }
        if (tokens[0][0] == 'u') {
            j-=depth;
        }
        if (tokens[0][0] == 'd') {
            j+=depth;
        }
    }
    console.log(i, j, i*j);
    i = 0;
    j = 0;
    let k = 0;

    for (let depth of depths) {
        
        let tokens = depth.split(' ');
        depth = +tokens[1];
        if (tokens[0][0] == 'f') {
            i+=depth;
            k+=j*depth;
        }
        if (tokens[0][0] == 'u') {
            j-=depth;
        }
        if (tokens[0][0] == 'd') {
            j+=depth;
        }
    }
    console.log(i, k, i*k);
}