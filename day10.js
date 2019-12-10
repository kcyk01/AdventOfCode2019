const rawInput = `#.#.##..#.###...##.#....##....###
...#..#.#.##.....#..##.#...###..#
####...#..#.##...#.##..####..#.#.
..#.#..#...#..####.##....#..####.
....##...#.##...#.#.#...#.#..##..
.#....#.##.#.##......#..#..#..#..
.#.......#.....#.....#...###.....
#.#.#.##..#.#...###.#.###....#..#
#.#..........##..###.......#...##
#.#.........##...##.#.##..####..#
###.#..#####...#..#.#...#..#.#...
.##.#.##.........####.#.#...##...
..##...#..###.....#.#...#.#..#.##
.#...#.....#....##...##...###...#
###...#..#....#............#.....
.#####.#......#.......#.#.##..#.#
#.#......#.#.#.#.......##..##..##
.#.##...##..#..##...##...##.....#
#.#...#.#.#.#.#..#...#...##...#.#
##.#..#....#..##.#.#....#.##...##
...###.#.#.......#.#..#..#...#.##
.....##......#.....#..###.....##.
........##..#.#........##.......#
#.##.##...##..###.#....#....###.#
..##.##....##.#..#.##..#.....#...
.#.#....##..###.#...##.#.#.#..#..
..#..##.##.#.##....#...#.........
#...#.#.#....#.......#.#...#..#.#
...###.##.#...#..#...##...##....#
...#..#.#.#..#####...#.#...####.#
##.#...#..##..#..###.#..........#
..........#..##..#..###...#..#...
.#.##...#....##.....#.#...##...##
`;

const rows = rawInput.trim().split('\n');
const height = rows.length,
      width = rows[0].length;

const points = [];
rows.forEach((row, y) => {
    [...row].forEach((p, x) => {
        if (p === '#') {
            points.push([x, y]);
        }
    });
});

let bestPosition;
let bestMapping;

function getDistance(p1, p2) {
    return Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] - p1[0]);
}

function normalize(point, targetPoint) {
    return [targetPoint[0] - point[0], targetPoint[1] - point[1]];
}

function part1() {
    let maxAngles = -1;
    points.forEach(p1 => {
        let angleMapping = {};
        points.forEach(p2 => {
            if (p1[0] !== p2[0] || p1[1] !== p2[1]) {
                let [p2x, p2y] = normalize(p1, p2);
                let angle = (Math.atan2(-p2y, p2x) * 180 / Math.PI + 270) % 361;
                if (!angleMapping[angle]) {
                    angleMapping[angle] = [];
                }
                angleMapping[angle].push({p: p2, d: getDistance(p1, p2)});
            }
        })

        let angles = Object.keys(angleMapping).length;
        if (angles > maxAngles) {
            maxAngles = angles;
            bestPosition = p1;
            bestMapping = angleMapping;
        }
    });
    return maxAngles;
}

function part2() {
    const angles = Object.keys(bestMapping);
    angles.forEach(angle => {
        bestMapping[angle] = bestMapping[angle].sort(({d: dA}, {d: dB}) => dA - dB);
    });
    const orderedAngles = angles.sort((a, b) => b - a);

    let i = 0;
    const asteroidOrder = [];
    while (asteroidOrder.length < 200) {
        let targetAngle = orderedAngles[i];
        if (bestMapping[targetAngle].length) {
            asteroidOrder.push(bestMapping[targetAngle].shift());
        }
        i = (i + 1) % orderedAngles.length;
    }
    const {p: [x, y]} = asteroidOrder[199];
    return 100 * x + y;
}

console.log(part1());
console.log(part2());