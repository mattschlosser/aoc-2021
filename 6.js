const fs = require('fs');
let buffer = fs.readFileSync('6');
let string = buffer.toString();
let lines = string.split('\n');
let fish = lines[0].split(',')

function range(days) {
    function *d(days) {
        for (let i = 0; i < days; i++) {
            yield i;
        }
        yield null;
    }
    return d(days);
}
// this function takes a list of lines (x1,y1 -> x2,y2), and a function isHit, and returns the number
// of lines that were hit more than once
let countFish = (fish, days) => {
    let fishCountA = new Array(9).fill(0)
    let fishCountB = new Array(9).fill(0)
    for (let f of fish) {
        fishCountA[f] += 1;
    }
    console.log(fishCountA);
    let gen = range(days);
    while (gen.next().value !== null) {
        fishCountB = [...fishCountA];
        let willReproduce = fishCountB.shift();
        fishCountB.push(willReproduce);
        fishCountB[6] += willReproduce;
        fishCountA = fishCountB;
    }
    return fishCountA;
    // return Object.keys(fishCountA).reduce((a, b) => a + fishCountA[b], 0);
}

// part 1 
console.log(countFish(fish, 80).reduce((a, b) => a + b, 0));


