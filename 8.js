// const { count } = require('console');
const fs = require('fs');
let buffer = fs.readFileSync('8');
let string = buffer.toString();
let lines = string.split('\n').filter(e => e != '');

let count = 0;
for (let line of lines) {
    let output = line.split('|');
    // console.log(output)
    let x = output[1].split(' ');
    for (let letter of x) 
        if ([2,3,4,7].includes(letter.length))
            count++;
}
/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/
let getNumber = (set) => {
    if (new Set([...set, 'a','b','c','e', 'f', 'g']).size == set.size && set.size == 6) return 0;
    if (new Set([...set, 'c','f']).size == set.size && set.size == 2) return 1;
    if (new Set([...set, 'a','c','d','e', 'g']).size == set.size && set.size == 5) return 2;
    if (new Set([...set, 'a','c','d', 'f', 'g']).size == set.size && set.size == 5) return 3;
    if (new Set([...set, 'b','c','d','f']).size == set.size && set.size == 4) return 4;
    if (new Set([...set, 'a','b','d','f','g']).size == set.size && set.size == 5) return 5;
    if (new Set([...set, 'a','b','d','e','f','g']).size == set.size && set.size == 6) return 6;
    if (new Set([...set, 'c','f','a']).size == set.size && set.size == 3) return 7;
    if (new Set([...set, 'a','b','c','d','e','f','g']).size == set.size && set.size == 7) return 8;
    if (new Set([...set, 'a','b','c','d','f','g']).size == set.size && set.size == 6) return 9;
    throw new Error('not possible')
}
let intersection = (a, b) => {
    return new Set([...a].filter(x => (new Set(b).has(x))))
}

let sum = 0;
// get the random segment
for (let line of lines) {
    
    let possibilities = {
        a: new Set(['a','b','c','d','e','f','g']),
        b: new Set(['a','b','c','d','e','f','g']),
        c: new Set(['a','b','c','d','e','f','g']),
        d: new Set(['a','b','c','d','e','f','g']),
        e: new Set(['a','b','c','d','e','f','g']),
        f: new Set(['a','b','c','d','e','f','g']),
        g: new Set(['a','b','c','d','e','f','g'])
    }
    // let possibilities = [];
    let [ten, four] = line.split('|');
    ten = ten.split(' ')
    for (let pattern of ten) {
        let combos = pattern.split('');
        // for (let combo of combos) {
        if (combos.length == 2) {
            possibilities.c = intersection(possibilities.c, combos); 
            possibilities.f = intersection(possibilities.f, combos); 
        }
        if (combos.length == 3) {
            possibilities.a = intersection(possibilities.a, combos); 
            possibilities.c = intersection(possibilities.c, combos); 
            possibilities.f = intersection(possibilities.f, combos); 
        }
        if (combos.length == 4) {
            possibilities.b = intersection(possibilities.b, combos); 
            possibilities.c = intersection(possibilities.c, combos); 
            possibilities.d = intersection(possibilities.d, combos); 
            possibilities.f = intersection(possibilities.f, combos); 
        }
        if (combos.length == 5) {
            possibilities.a = intersection(possibilities.a, combos); 
            possibilities.d = intersection(possibilities.d, combos); 
            possibilities.g = intersection(possibilities.g, combos); 
        }
        if (combos.length == 6) {
            // tells us that it is deffintely ...
            possibilities.a = intersection(possibilities.a, combos);
            possibilities.b = intersection(possibilities.b, combos); 
            possibilities.f = intersection(possibilities.f, combos); 
            possibilities.g = intersection(possibilities.g, combos); 
        }
        // }
    }
    // console.log(possibilities)
    for (let set of [possibilities.c, possibilities.f]) {
        for (let other in possibilities) {
            for (let item of set) {
                if (!['f','c'].includes(other) && possibilities[other].has(item)) {
                
                    possibilities[other].delete(item);
                }
            }
        }
    }
    // console.log(possibilities)
    for (let set of [possibilities.a]) {
        for (let other in possibilities) {
            for (let item of set) {
                if (!['a'].includes(other) && possibilities[other].has(item)) {
                
                    possibilities[other].delete(item);
                }
            }
        }
    }
    // console.log(possibilities)
    for (let set of [possibilities.b, possibilities.d]) {
        for (let other in possibilities) {
            for (let item of set) {
                if (!['b', 'd'].includes(other) && possibilities[other].has(item)) {
                
                    possibilities[other].delete(item);
                }
            }
        }
    }
    for (let set of [possibilities.g]) {
        for (let other in possibilities) {
            for (let item of set) {
                if (!['g'].includes(other) && possibilities[other].has(item)) {
                
                    possibilities[other].delete(item);
                }
            }
        }
    }
    for (let set of [possibilities.f]) {
        for (let other in possibilities) {
            for (let item of set) {
                if (!['f'].includes(other) && possibilities[other].has(item)) {   
                    possibilities[other].delete(item);
                }
            }
        }
    }
    // console.log(possibilities)
    // insert the set into the line
    let final = {};
    for (let key in possibilities) {
        final[Array.from(possibilities[key])[0]] = key;
    }
    // console.log(final)
    four = four.split(' ').filter(e => e != '');
    let digits = [];
    for (let number of four) {
        // console.log(number);
        // convert the number to the proper segment
        let pieces = number.split('');
        let set = new Set();
        for (let piece of pieces) {
            set.add(final[piece]);
        }
        digits.push(getNumber(set));
    }
    let val = +digits.join('');
    sum += val;
}



// part 1 
console.log(count);

// part 2
console.log(sum);
