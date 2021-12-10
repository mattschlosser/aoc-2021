const fs = require('fs');
let buffer = fs.readFileSync('10');
let string = buffer.toString();
let lines = string.split('\n').filter(e => e != '');

let table = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}
let total = 0;
let stash = [];
let openingBrackets = ['(', '[', '{', '<'];
let closingBrackets = [')', ']', '}', '>'];
let partnerBracket = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
}

for (let iine of lines) {
    // determine if line has matching bracket
    let brackets = iine.split('');
    
    for (let bracket of brackets) {
        if (openingBrackets.includes(bracket)) {
            stash.push(bracket);
        } else if (closingBrackets.includes(bracket)) {
            let lastBracket = stash[stash.length - 1];
            let expectedBracket = partnerBracket[lastBracket];
            if (expectedBracket == bracket) {
                stash.pop();
            } else {
                total += table[bracket];
                break;
            }
        }
    }    



}

//console.log(total);
console.log(total);