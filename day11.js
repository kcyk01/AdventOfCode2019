const rawInput = `3,8,1005,8,358,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,29,1,1104,7,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,54,1,103,17,10,1,7,3,10,2,8,9,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,89,1,1009,16,10,1006,0,86,1006,0,89,1006,0,35,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,124,1,105,8,10,1,2,0,10,1,1106,5,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,158,1,102,2,10,1,109,17,10,1,109,6,10,1,1003,1,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,195,1006,0,49,1,101,5,10,1006,0,5,1,108,6,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,232,2,1102,9,10,1,1108,9,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,262,1006,0,47,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,286,1006,0,79,2,1003,2,10,2,107,0,10,1006,0,89,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,323,1006,0,51,2,5,1,10,1,6,15,10,2,1102,3,10,101,1,9,9,1007,9,905,10,1005,10,15,99,109,680,104,0,104,1,21101,838211572492,0,1,21101,0,375,0,1106,0,479,21102,1,48063328668,1,21102,386,1,0,1106,0,479,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,1,21679533248,1,21101,0,433,0,1105,1,479,21102,235190455527,1,1,21102,444,1,0,1106,0,479,3,10,104,0,104,0,3,10,104,0,104,0,21101,0,837901247244,1,21102,1,467,0,1106,0,479,21101,0,709488169828,1,21102,1,478,0,1105,1,479,99,109,2,22102,1,-1,1,21102,1,40,2,21101,0,510,3,21102,1,500,0,1105,1,543,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,505,506,521,4,0,1001,505,1,505,108,4,505,10,1006,10,537,1102,1,0,505,109,-2,2106,0,0,0,109,4,2101,0,-1,542,1207,-3,0,10,1006,10,560,21101,0,0,-3,21201,-3,0,1,21202,-2,1,2,21102,1,1,3,21102,1,579,0,1105,1,584,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,607,2207,-4,-2,10,1006,10,607,21202,-4,1,-4,1106,0,675,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21101,0,626,0,1106,0,584,22101,0,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,645,21102,1,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,667,22101,0,-1,1,21102,1,667,0,105,1,542,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0
`;
const instructions = rawInput.trim().split(',').map(op => parseInt(op));

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function getReadParamValue(mode, values, pos, basePos) {
    switch (mode) {
        case '0':
            return values[values[pos]] || 0;
        case '1':
            return values[pos] || 0;
        case '2':
            return values[basePos + values[pos]] || 0;
    }
}

function getWriteParamValue(mode, values, pos, basePos) {
    switch (mode) {
        case '2':
            return basePos + values[pos] || 0;
        default:
            return values[pos] || 0;
    }
}

function execute(instructionState, readInput, writeOutput, startPointer = 0) {
    const values = [...instructionState]
    let i = startPointer,
        basePos = 0;
    
    while (i < values.length && values[i] !== 99) {
        const [p3mode, p2mode, p1mode, _, op] = values[i].toString().padStart(5, '0');
        let opSize;
        switch (op) {
            case '1':
                opSize = 4;
                values[getWriteParamValue(p3mode, values, i+3, basePos)] = getReadParamValue(p1mode, values, i+1, basePos) + getReadParamValue(p2mode, values, i+2, basePos);
                break;
            case '2':
                opSize = 4;
                values[getWriteParamValue(p3mode, values, i+3, basePos)] = getReadParamValue(p1mode, values, i+1, basePos) * getReadParamValue(p2mode, values, i+2, basePos);
                break;
            case '3':
                opSize = 2;
                values[getWriteParamValue(p1mode, values, i+1, basePos)] = readInput();
                break;
            case '4':
                opSize = 2;
                let output = getReadParamValue(p1mode, values, i+1, basePos);
                writeOutput(output);
                break;
            case '5':
                opSize = 0;
                if (getReadParamValue(p1mode, values, i+1, basePos) !== 0) {
                    i = getReadParamValue(p2mode, values, i+2, basePos);
                } else {
                    i += 3;
                }
                break;
            case '6':
                opSize = 0;
                if (getReadParamValue(p1mode, values, i+1, basePos) === 0) {
                    i = getReadParamValue(p2mode, values, i+2, basePos);
                } else {
                    i += 3;
                }
                break;
            case '7':
                opSize = 4;
                values[getWriteParamValue(p3mode, values, i+3, basePos)] = getReadParamValue(p1mode, values, i+1, basePos) < getReadParamValue(p2mode, values, i+2, basePos) ? 1 : 0;
                break;
            case '8':
                opSize = 4;
                values[getWriteParamValue(p3mode, values, i+3, basePos)] = getReadParamValue(p1mode, values, i+1, basePos) === getReadParamValue(p2mode, values, i+2, basePos) ? 1 : 0;
                break;
            case '9':
                opSize = 2;
                basePos += getReadParamValue(p1mode, values, i+1, basePos);
                break;
        }
        i += opSize;
    }
}

function stepForward(x, y, dir) {
    switch (dir) {
        case UP:
            y++;
            break;
        case DOWN:
            y--;
            break;
        case LEFT:
            x--;
            break;
        case RIGHT:
            x++;
            break;
    }
    return [x, y];
}

function printPaintState(paintState) {
    let minX = 9999999,
        maxX = -1,
        minY = 9999999,
        maxY = -1;

    Object.keys(paintState).forEach(coord => {
        let [x, y] = coord.split(',');
        minX = Math.min(x, minX);
        maxX = Math.max(x, maxX);
        minY = Math.min(y, minY);
        maxY = Math.max(y, maxY);
    });

    const height = maxY - minY,
          width = maxX - minX;

    let output = '';
    for (let i = height; i >= 0; i--) {
        for (let j = 0; j < width; j++) {
            output += paintState[[j, i - height]] === 1 ? '#' : ' ';
        }
        output += '\n';
    }
    return output;
}

function paint(isPart2 = false) {
    const paintState = {};
    let isPainting = true,
        x = 0,
        y = 0
        dir = 0;
    execute(
        [...instructions],
        () => {
            return paintState[[x,y]] || (isPart2 && x === 0 && y === 0 ? 1 : 0);
        },
        (out) => {
            if (isPainting) {
                paintState[[x,y]] = out;
            } else {
                dir = (dir + (out * 2 - 1) + 4) % 4;
                [x, y] = stepForward(x, y, dir);
            }
            isPainting = !isPainting;
        }
    );
    return paintState;
}

function part1() {
    const paintState = paint();
    return Object.keys(paintState).length;
}

function part2() {
    const paintState = paint(true);
    return printPaintState(paintState);
}

console.log(part1());
console.log(part2());