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
let autoCompletes = [];


let autocmpleteScores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

for (let iine of lines) {
    // determine if line has matching bracket
    let brackets = iine.split('');
    
    let stash = [];
    let lineIsCorrupt = false;
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
                lineIsCorrupt = true;
                break;
            }
        }
    }    

    if (!lineIsCorrupt) {
        let autocompleteScore = 0;
        // sum up the remianing brackets in the stash according to autoComplete scores
        stash.reverse()
        for (let bracket of stash) {
            autocompleteScore = autocompleteScore * 5 + autocmpleteScores[partnerBracket[bracket]];
        }
        autoCompletes.push(autocompleteScore);
    }

}

//console.log(total);
console.log(total);

// sort autoCompletes and take the middle value
autoCompletes.sort((a, b) => a - b);
console.log(autoCompletes[Math.floor(autoCompletes.length / 2)]);