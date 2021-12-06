const fs = require('fs');
let buffer = fs.readFileSync('6');
let string = buffer.toString();
let lines = string.split('\n');
let fish = lines[0].split(',')


let countFish = (fish, days) => {
    let fishCount = new Array(9).fill(0)
    for (let f of fish) {
        fishCount[f] += 1;
    }
    for (let i = 0; i < days; i++) {
        let willReproduce = fishCount.shift();
        fishCount.push(willReproduce);
        fishCount[6] += willReproduce;
    }
    return fishCount;
}

let sumFish = fish => fish.reduce((a, b) => a + b, 0);

// part 1 
console.log(sumFish(countFish(fish, 80)));

// part 2
console.log(sumFish(countFish(fish, 256)));


