let rawInput = `3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1002,1034,1,1039,102,1,1036,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1106,0,124,1002,1034,1,1039,1001,1036,0,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1105,1,124,1001,1034,-1,1039,1008,1036,0,1041,1001,1035,0,1040,1002,1038,1,1043,101,0,1037,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,102,1,1035,1040,1001,1038,0,1043,101,0,1037,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,1,1032,1006,1032,165,1008,1040,9,1032,1006,1032,165,1102,1,2,1044,1105,1,224,2,1041,1043,1032,1006,1032,179,1102,1,1,1044,1106,0,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,35,1044,1106,0,224,1101,0,0,1044,1105,1,224,1006,1044,247,102,1,1039,1034,1002,1040,1,1035,1002,1041,1,1036,102,1,1043,1038,101,0,1042,1037,4,1044,1105,1,0,1,5,41,19,22,1,39,81,29,20,15,82,33,18,45,30,32,55,28,26,70,13,56,32,28,18,3,59,90,11,95,15,85,8,61,25,59,24,34,1,85,5,25,54,57,18,20,54,80,91,28,65,36,12,44,36,13,92,24,56,13,39,69,29,79,10,41,27,23,25,72,20,3,61,15,51,11,12,12,48,10,45,13,29,49,90,30,17,9,41,21,18,7,30,48,17,83,71,4,10,31,10,96,81,77,9,50,39,21,36,33,72,12,3,23,79,18,4,75,17,58,64,8,7,97,60,72,72,1,94,55,42,2,94,2,21,88,19,82,57,96,19,25,27,41,62,15,40,23,61,86,27,73,61,13,46,52,81,12,34,23,73,23,59,1,30,47,9,99,10,37,17,28,98,5,92,73,8,63,4,86,76,79,7,30,68,28,91,12,12,98,74,4,22,44,10,23,45,37,16,90,76,23,74,75,12,21,38,14,15,76,28,49,71,7,6,6,71,53,33,12,87,15,92,66,21,38,13,53,92,34,49,25,6,67,21,27,89,24,61,25,30,41,30,99,28,19,41,90,51,74,14,33,54,48,10,14,42,2,67,76,10,21,2,67,43,27,69,11,16,78,7,36,9,24,48,63,81,53,29,94,34,25,99,66,47,17,97,33,52,11,62,22,52,30,23,89,95,15,13,50,48,26,10,6,69,78,13,6,94,1,28,67,10,70,16,50,19,24,15,79,50,27,3,19,62,4,31,83,20,17,83,67,5,80,26,36,62,87,3,10,80,22,65,60,10,78,4,20,60,30,11,7,83,10,13,72,81,37,22,14,55,63,51,27,32,77,52,20,50,16,48,2,55,10,53,26,84,6,87,43,37,26,3,85,62,25,78,50,16,10,37,22,54,5,80,24,7,32,49,18,27,12,41,70,82,20,34,91,15,98,77,22,6,79,3,8,54,17,32,4,44,2,97,14,15,65,30,97,14,79,75,11,77,5,61,37,20,91,20,45,74,19,40,2,41,89,12,34,44,18,62,57,17,68,22,96,7,59,63,2,60,70,2,26,75,26,3,53,19,80,16,97,7,34,58,52,66,24,75,25,30,75,42,13,12,89,13,3,84,92,1,75,30,54,43,2,56,15,1,15,84,99,6,98,42,17,29,1,18,26,70,71,29,91,23,21,87,66,18,38,32,18,81,65,2,58,99,12,4,84,24,32,88,30,67,49,29,59,64,18,70,10,24,56,5,27,97,50,4,28,85,65,16,67,83,15,16,61,18,86,8,36,25,36,29,97,45,19,81,41,29,45,30,69,26,57,93,27,72,34,30,99,61,2,48,16,12,76,98,28,14,32,32,90,48,10,30,57,23,39,2,8,39,33,13,88,34,31,74,15,60,8,47,60,31,5,79,1,98,86,33,3,99,33,62,11,96,25,22,38,98,84,3,56,70,49,3,8,56,87,4,29,59,65,26,34,77,7,14,78,26,25,70,49,3,31,45,92,24,95,17,4,9,4,96,64,92,27,67,4,99,6,44,7,16,86,2,75,1,6,68,81,4,1,44,49,7,92,8,40,36,25,81,13,56,99,10,2,30,72,6,43,30,12,43,93,19,20,23,95,10,19,66,63,28,96,40,50,8,15,56,38,13,93,42,71,12,18,87,8,4,21,85,9,2,66,77,10,80,26,61,9,43,20,88,10,39,67,55,31,49,17,58,26,80,20,84,54,49,5,73,11,52,15,63,7,62,24,57,92,61,25,87,56,37,31,38,14,99,0,0,21,21,1,10,1,0,0,0,0,0,0
`;
const instructions = rawInput.trim().split(',').map(op => parseInt(op));

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

const NORTH = 1;
const SOUTH = 2;
const WEST = 3;
const EAST = 4;

function getDirection([currentX, currentY], [targetX, targetY]) {
    if (currentX === targetX) {
        if (currentY + 1 === targetY) return NORTH;
        if (currentY - 1 === targetY) return SOUTH;
    }
    if (currentY === targetY) {
        if (currentX - 1 === targetX) return WEST;
        if (currentX + 1 === targetX) return EAST;
    }
    return -1;
}

function getAdjacent(x, y) {
    return [
        [x, y + 1],
        [x, y - 1],
        [x + 1, y],
        [x - 1, y]
    ];
}

function getReverseDir(path) {
    let dir = path.pop();
    if (dir === NORTH) return SOUTH;
    if (dir === SOUTH) return NORTH;
    if (dir === WEST) return EAST;
    if (dir === EAST) return WEST
}

function moveInDirection(x, y, dir) {
    if (dir === NORTH) return [x, y + 1];
    if (dir === SOUTH) return [x, y - 1];
    if (dir === WEST) return [x - 1, y];
    if (dir === EAST) return [x + 1, y];
}

const walkable = new Set();
let oxygenX,
    oxygenY,
    oxygenPath;

function part1() {
    let x = 0,
        y = 0,
        next, dir,
        backtrack = false;
    let stack = [[0, 1], [0, -1], [-1, 0], [1, 0]];
    const currentPath = [];
    const visited = new Set([`${x},${y}`]);
    walkable.add(`${x},${y}`);

    try {
        execute(
            [...instructions],
            () => {
                if (!stack.length) throw 0;
                next = next || stack.pop();
                dir = getDirection([x, y], next);
                if (dir === -1) {
                    let bdir = getReverseDir(currentPath);
                    [x, y] = moveInDirection(x, y, bdir);
                    backtrack = true;
                    return bdir;
                }
                backtrack = false;
                return dir;
            },
            (out) => {
                if (backtrack) return;
                if (out !== 0) {
                    walkable.add(`${next[0]},${next[1]}`);
                    [x, y] = next;
                    stack = [
                        ...stack,
                        ...getAdjacent(x, y).filter(p => !visited.has(`${p[0]},${p[1]}`))
                    ];
                    currentPath.push(dir);
                    if (out === 2) {
                        oxygenPath = [...currentPath];
                        [oxygenX, oxygenY] = next;
                    }
                }
                visited.add(`${next[0]},${next[1]}`);
                next = null;
            }
        )
    } catch (ex) {}
    return oxygenPath.length;
}

function part2() {
    const visited = new Set([`${oxygenX},${oxygenY}`]);
    let stack = [
        [1, oxygenX, oxygenY - 1],
        [1, oxygenX, oxygenY + 1],
        [1, oxygenX - 1, oxygenY],
        [1, oxygenX + 1, oxygenY]
    ];
    let deepest = -1;
    while (stack.length) {
        let [dist, x, y] = stack.pop();
        if (walkable.has(`${x},${y}`)) {
            deepest = Math.max(deepest, dist);
            stack = [
                ...stack, 
                ...getAdjacent(x, y)
                    .filter(p => !visited.has(`${p[0]},${p[1]}`))
                    .map(p => [dist + 1, p[0], p[1]])
            ];
        }
        visited.add(`${x},${y}`);
    }
    return deepest;
}

console.log(part1());
console.log(part2());