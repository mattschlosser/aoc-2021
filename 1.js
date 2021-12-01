const fs = require('fs');
let buffer = fs.readFileSync('1');
let string = buffer.toString();
let lines = string.split('\n')
let i = null;
for (let line of lines) {
    let tokens = line.split(' ');

}
console.log(i);