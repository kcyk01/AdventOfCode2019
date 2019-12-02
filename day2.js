const rawInput = `1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,6,19,23,2,23,6,27,2,6,27,31,2,13,31,35,1,10,35,39,2,39,13,43,1,43,13,47,1,6,47,51,1,10,51,55,2,55,6,59,1,5,59,63,2,9,63,67,1,6,67,71,2,9,71,75,1,6,75,79,2,79,13,83,1,83,10,87,1,13,87,91,1,91,10,95,2,9,95,99,1,5,99,103,2,10,103,107,1,107,2,111,1,111,5,0,99,2,14,0,0
`;
const input = rawInput.trim().split(',').map(e => parseInt(e));

function runProgram(values) {
    let i = 0;
    while (i < values.length && values[i] !== 99) {
        const [a, b, c, d] = values.slice(i, i + 4);
        if (a === 1) {
            values[d] = values[b] + values[c];
        } else {
            values[d] = values[b] * values[c];
        }
        i += 4;
    }
}

function part1() {
    const values = [...input];
    values[1] = 12;
    values[2] = 2;

    runProgram(values);
    
    return values[0];
}

function part2() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const values = [...input];
            values[1] = i;
            values[2] = j;
            runProgram(values);

            if (values[0] === 19690720) {
                return 100 * i + j;
            }
        }
    }
}

console.log(part1());
console.log(part2());