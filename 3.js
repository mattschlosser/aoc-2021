const fs = require('fs');
let buffer = fs.readFileSync('3');
let string = buffer.toString();
let items = string.split('\n\n');

function common(depths) {
    let total= 0;
    let totals = [];
    for (let depth of depths) {
        let tokens = depth.split('');
        tokens.forEach((e,i) => {
            if (+e == 1) {
                if (totals[i]) {
                    totals[i]++
                } else {
                    totals[i] = 1
                }
            }
        })
        total++;
    }
    let mostCommon = totals.map(t => t/total >= 0.5 ? '1' : '0');
    let leastCommon = totals.map(t => t/total < 0.5 ? '1' : '0');
    return [mostCommon, leastCommon];
}

function reducer(depths, mode) {
    let reduced = depths;
    let mostCommon = null;
    for (let index = 0; index < depths[0].length; index++) {
        if (reduced.length == 1) break;
        mostCommon = common(reduced)[mode];
        reduced = reduced.filter(e => e[index] == mostCommon[index]);
    }
    return parseInt(reduced[0], 2);
}

for (let item of items) {
    // part 1
    let depths = string.split('\n').filter(e => e != ''); // remove empty lines 
    let [mostCommon, leastCommon] = common(depths);
    let i = parseInt(mostCommon.join(''), 2);
    let j = parseInt(leastCommon.join(''), 2);
    console.log(i, j, i*j);

    // part 2
    i = reducer(depths, 0);
    j = reducer(depths, 1);
    console.log(i, j, i*j);
}