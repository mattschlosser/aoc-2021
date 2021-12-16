const fs = require('fs');
const { exit } = require('process');
let buffer = fs.readFileSync('16');
let string = buffer.toString();
// let [lines, instructions ] = string.split('\n\n');
lines = string.split('\n').filter(e => e != '').map(e => e.split('').map(e => ("000" + parseInt(e, 16).toString(2)).slice(-4)).join(''));
// console.table(lines);
let versions = 0;

let parseNextPacket = (line) => {
    let version = parseInt(line.substr(0, 3), 2);
    versions += version;
    let type = parseInt(line.substr(3, 3), 2);
    console.log(version, type);
    if (type == 4) {
        let bits = [];
        let i;
        for (i = 6; i < line.length; i += 5) {
            bits.push(line.substr(i+1, 4));
            if (line[i] == '0') {
                break;
            }
        }
        
        let value = parseInt(bits.join(''), 2);
        console.log("Literal", value);
        return i+5;
        // console.log("Packet", line.substr(0, i+5));
    } else {
        let typeId = line[6];
        console.log("TYPE ID: ", typeId);
        // If the length type ID is 0, then the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
        if (typeId == '0') {
            let packetsLength = parseInt(line.substr(7, 15), 2);
            console.log("Packet length: ", packetsLength);
            // i know how long all the packets are but now how long each one is
            console.log(line.substr(22));
            for (let count = 0; count < packetsLength;) {
                console.log(`Parsing packet ${count} of ${packetsLength}: `, line.substr(22 + count));
                count += parseNextPacket(line.substr(22 + count));
            }
            return 22 + packetsLength;
            console.log(packetsLength);
        } else {
            // i know there are n packets, but not how long each one is
            let packetCount = parseInt(line.substr(7, 11), 2);
            let count = 18;
            for (let i = 0; i < packetCount; i++) {
                console.log(`Parsing packet ${i} of ${packetCount}: `, line.substr(count));
                count += parseNextPacket(line.substr(count));
            }
            return count;
        }

    }
}

for (let line of lines) {
    console.log(line);
    parseNextPacket(line);
  
}
console.log(versions);
