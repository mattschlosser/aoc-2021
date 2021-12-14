const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('14');
let string = buffer.toString();
let [lines, instructions ] = string.split('\n\n');
// let dots = lines.split('\n').filter(e => e != '');
instructions = instructions.split('\n').filter(e => e != '');

// find max and min keys of count
let diff = (count) => {
    let max = 0;
    let maxKey = '';
    let min = Number.MAX_SAFE_INTEGER;
    let minKey = '';
    for (let key in count) {
        if (count[key] > max) {
            max = count[key];
            maxKey = key;
        }
        if (count[key] < min) {
            min = count[key];
            minKey = key;
        }
    }
    return max - min
}

let iterations = (lines, iterations) => {
    let c = {};
    let d = {};
    lines += '_'; // hack
    for (let line in lines) {
        let first = lines[line];
        let second = lines[parseInt(line) + 1];
        if (second != undefined) {
            c[`${first}${second}`] = (c[`${first}${second}`] || 0) + 1;
        }
    }
    // ok so we just count each occurent of each pair initally 
    for (let i = 0; i < iterations; i++) {
        // break;
        for (let item in c) {   
            let [current, next] = item.split('');
            // console.log(current, next);
            // console.log(current, next);
            let value = c[item];
            if (next != undefined) {
                for (let instruction of instructions) {
                    let [first, second, toInsert] = instruction.split(/ -> |/);
                    if (current == first && next == second) {
                        // add or insert
                        // d[item] = 0;
                        d[`${first}${toInsert}`] = d[`${first}${toInsert}`] == undefined ? value : d[`${first}${toInsert}`] + value
                        d[`${toInsert}${second}`] = d[`${toInsert}${second}`] == undefined ? value : d[`${toInsert}${second}`] + value
                    }
                }
            }
        }
        c = d;
        d = {};
    }
    c[`${lines[lines.length - 2]}_`] = 1;
    let count = {};
    for (let key in c) {
        // console.log(key, c[key]);
        // split the keys into two parts
        let [first, second] = key.split('');
        // count each instance of each key
        count[first] = (count[first] || 0) + c[key];
        // count[second] = (count[second] || 0) + c[key];
    }
    return diff(count);
}

console.log(iterations(lines, 10));
console.log(iterations(lines, 40));