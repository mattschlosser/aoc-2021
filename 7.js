const fs = require('fs');
let buffer = fs.readFileSync('7');
let string = buffer.toString();
let lines = string.split('\n');
let positions = lines[0].split(',')



let calculteFuelNeeded = (positions, position, fuelCost) => {
    let total = 0;
    for (let pos of positions) {
        total += fuelCost(position, pos);
    }
    return total;
}

let fuelCost = (position, pos) => Math.abs(pos - position);

let correctedFuelCost = (position, pos) =>{
    let n = Math.abs(pos - position);
    let result =  (n + 1) * (n) /2;
    return result;
}

let findLeastPosition = (positions, fuelCost) => {
    let min = positions.reduce((min, pos) => Math.min(min, pos), Number.MAX_SAFE_INTEGER);
    let max = positions.reduce((max, pos) => Math.max(max, pos), Number.MIN_SAFE_INTEGER);
    let least = min;
    for (let pos = min; pos <= max; pos++) {
        if (calculteFuelNeeded(positions, pos, fuelCost) < calculteFuelNeeded(positions, least, fuelCost)) {
            least = pos;
        }
    }
    return calculteFuelNeeded(positions, least, fuelCost);
}

// part 1 
console.log(findLeastPosition(positions, fuelCost));

// part 2
console.log(findLeastPosition(positions, correctedFuelCost));


