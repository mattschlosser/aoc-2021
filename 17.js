const { assert } = require('console');
const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('17');
let string = buffer.toString();
// let [lines, instructions ] = string.split('\n\n');
console.log(string);
let [[_,x1, x2, y1, y2]] = string.matchAll(/x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/g);
console.log(x1, x2, y1, y2);

let velocity = {x: 0, y: 0};
let position  = {x: 0, y: 0};
target = {minX: +x1, maxX: +x2, minY: +y1, maxY: +y2};
let doesHitTarget= (velocity, position, target) => {
    if (position.x >= target.minX && position.x <= target.maxX && position.y >= target.minY && position.y <= target.maxY) {
        return  [true, 0, 0];
    } else if (position.x > target.maxX || position.y < target.minY) {
        return [false, position.x - target.maxX, position.y - target.maxY]; // we overshot the target
    } else if (velocity.x == 0 && position.x < target.minX) {
        return [false, position.x - target.minX, position.y - target.minY]; // edge case. really only if inputted
    } else {
        // keep trying
        let newPosition = {...position};
        let newVelocity = {...velocity};
        newPosition.x += newVelocity.x
        newPosition.y += newVelocity.y;
        if (newVelocity.x > 0) {
            newVelocity.x--
        } else if (newVelocity.x < 0) {
            newVelocity.x++;
        }
        newVelocity.y --;
        // console.log(newVelocity, newPosition, target);
        return doesHitTarget(newVelocity, newPosition, target);
    }
}
console.log(doesHitTarget(velocity, position, target))
let testTarget =  {minX: 20, maxX: 30, minY: -10, maxY: -5};
console.log(doesHitTarget({x: 7, y: 2}, {x: 0, y: 0}, testTarget)); // true
console.log(doesHitTarget({x: 6, y: 3}, {x: 0, y: 0}, testTarget)); // true
console.log(doesHitTarget({x: 9, y: 0}, {x: 0, y: 0}, testTarget)); // true
console.log(doesHitTarget({x: 6, y: 9}, {x: 0, y: 0}, testTarget)); // true
console.log(doesHitTarget({x: 17, y: 4}, {x: 0, y: 0}, testTarget)); // false
console.log(doesHitTarget({x: 24, y: 73}, {x: 0, y: 0}, target)) // trial and error - ha


let countHits = (target) => {
    let count = 0;
    for (let y = -target.minY; y >= target.minY; y--) {
        for (let x = 0; x < target.maxX +1; x++) {
            // console.log("trying", x, y)
            let [result, xError, yError] = doesHitTarget({x, y}, {x: 0, y: 0}, target);
            if (result == true) {
                count++;
            }
        }
    }
    return count;
}
console.log(countHits(testTarget))
console.log(countHits(target));