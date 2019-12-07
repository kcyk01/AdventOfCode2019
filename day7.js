const rawInput = `3,8,1001,8,10,8,105,1,0,0,21,34,47,72,81,102,183,264,345,426,99999,3,9,102,5,9,9,1001,9,3,9,4,9,99,3,9,101,4,9,9,1002,9,3,9,4,9,99,3,9,102,3,9,9,101,2,9,9,102,5,9,9,1001,9,3,9,1002,9,4,9,4,9,99,3,9,101,5,9,9,4,9,99,3,9,101,3,9,9,1002,9,5,9,101,4,9,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99
`;
const instructions = rawInput.trim().split(',').map(op => parseInt(op));

function getPermutations(values) {
    if (values.length <= 1) {
        return [values];
    }
    const [a, ...rest] = values;
    const subPermutations = getPermutations(rest);
    const perms = [];
    for (let i = 0; i < values.length; i++) {
        subPermutations.forEach(p => {
            let x = [...p];
            x.splice(i, 0, a);
            perms.push(x);
        });
    }
    return perms;
}

function getParamValue(mode, values, pos) {
    return mode === '0' ? values[values[pos]] : values[pos];
}

function execute(instructionState, getInput, startPointer = 0, isPart2 = false) {
    const values = [...instructionState]
    let i = startPointer,
        output;
    
    while (i < values.length && values[i] !== 99) {
        const [p2mode, p1mode, _, op] = values[i].toString().padStart(4, '0');
        let opSize;
        switch (op) {
            case '1':
                opSize = 4;
                values[values[i+3]] = getParamValue(p1mode, values, i+1) + getParamValue(p2mode, values, i+2);
                break;
            case '2':
                opSize = 4;
                values[values[i+3]] = getParamValue(p1mode, values, i+1) * getParamValue(p2mode, values, i+2);
                break;
            case '3':
                opSize = 2;
                let newInput = getInput();
                if (isPart2 && newInput === null) {
                    // Node requires an unavailable input, pausing
                    return [output, { i: i, ops: values, done: false}];
                }
                values[values[i+1]] = newInput;
                break;
            case '4':
                opSize = 2;
                output = getParamValue(p1mode, values, i+1);
                if (isPart2) {
                    // Node is outputting an input, pausing
                    i += opSize;
                    return [output, { i: i, ops: values, done: false}];
                }
                break;
            case '5':
                opSize = 0;
                i = getParamValue(p1mode, values, i+1) && getParamValue(p2mode, values, i+2) || i + 3;
                break;
            case '6':
                opSize = 0;
                i = !getParamValue(p1mode, values, i+1) && getParamValue(p2mode, values, i+2) || i + 3;
                break;
            case '7':
                opSize = 4;
                values[values[i+3]] = getParamValue(p1mode, values, i+1) < getParamValue(p2mode, values, i+2) ? 1 : 0;
                break;
            case '8':
                opSize = 4;
                values[values[i+3]] = getParamValue(p1mode, values, i+1) === getParamValue(p2mode, values, i+2) ? 1 : 0;
                break;
        }
        i += opSize;
    }
    if (isPart2) {
        // Node has terminated
        return [output, { i: i, ops: values, done: true}];
    }
    return output;
}

function part1() {
    const perms = getPermutations([0, 1, 2, 3, 4]);
    let maxOutput = -1;
    perms.forEach(inputOrder => {
        let output = 0;
        inputOrder.forEach(input => {
            output = execute(
                [...instructions],
                (function() {
                    let inputUsed = false;
                    return () => {
                        if (inputUsed) {
                            return output;
                        }
                        inputUsed = true;
                        return input;
                    };
                })());
            maxOutput = Math.max(output, maxOutput);
        });
    });
    return maxOutput;
}

function part2() {
    const perms = getPermutations([5, 6, 7, 8, 9]);
    let maxOutput = -1;
    perms.forEach(inputOrder => {
        let state = {
            0: { ops: [...instructions], i: 0, input: [inputOrder[0], 0], done: false},
            1: { ops: [...instructions], i: 0, input: [inputOrder[1]], done: false},
            2: { ops: [...instructions], i: 0, input: [inputOrder[2]], done: false},
            3: { ops: [...instructions], i: 0, input: [inputOrder[3]], done: false},
            4: { ops: [...instructions], i: 0, input: [inputOrder[4]], done: false},
        };
        
        let currentNode = 0;
        while (Object.values(state).filter(s => !s.done).length) {
            nextNode = (currentNode + 1) % 5;
            if (!state[currentNode].done) {
                let [output, newState] = execute(
                    state[currentNode].ops,
                    () => {
                        if (!state[currentNode].input) {
                            return null;
                        }
                        return state[currentNode].input.shift();
                    },
                    state[currentNode].i,
                    true
                );
    
                // Update current node state
                state[currentNode] = {
                    ...state[currentNode],
                    ops: newState.ops,
                    i: newState.i,
                    done: newState.done
                };

                maxOutput = Math.max(output || -1, maxOutput);

                // Update next node input with the new output if an output was returned
                if (output !== null) {
                    state[nextNode].input.push(output);
                }
            }
            currentNode = nextNode;
        }
    });
    return maxOutput;
}

console.log(part1());
console.log(part2());