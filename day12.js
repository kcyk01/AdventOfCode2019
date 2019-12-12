let rawInput = `<x=-15, y=1, z=4>
<x=1, y=-10, z=-8>
<x=-5, y=4, z=9>
<x=4, y=6, z=-2>
`;

function getVelocityChange(pos1, pos2) {
    if (pos1 === pos2) return 0;
    return pos1 < pos2 ? -1 : 1;
}

function lcm(nums) {
    if (nums.length === 1) {
        return nums[0];
    }
    if (nums.length === 2) {
        const [a, b] = nums;
        if (a % b === 0) return a;
        if (b % a === 0) return b;
        
        const c = Math.max(a, b),
              d = Math.min(a, b);

        let x, i = 1;
        while (x !== c * d) {
            x = c * i;
            if (x % d === 0) {
                return x;
            }
            i++;
        }
    }
    return lcm([nums[0], lcm(nums.slice(1))]);
}

class Moon {
    constructor(id, x, y, z) {
        this.id = id;
        this.position = [parseInt(x), parseInt(y), parseInt(z)];
        this.velocity = [0, 0, 0];
    }

    applyGravity(otherMoons) {
        otherMoons.forEach(moon => {
            if (moon.id === this.id) {
                return;
            }
            let [mX, mY, mZ] = moon.position;
            this.velocity[0] += getVelocityChange(mX, this.position[0]);
            this.velocity[1] += getVelocityChange(mY, this.position[1]);
            this.velocity[2] += getVelocityChange(mZ, this.position[2]);
        });
    }

    applyVelocity() {
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[2] += this.velocity[2];
    }

    getPotentialEnergy() {
        return Math.abs(this.position[0]) + Math.abs(this.position[1]) + Math.abs(this.position[2]);
    }

    getKineticEnergy() {
        return Math.abs(this.velocity[0]) + Math.abs(this.velocity[1]) + Math.abs(this.velocity[2]);
    }

    getTotalEnergy() {
        return this.getPotentialEnergy() * this.getKineticEnergy();
    }
}

let moonConfigs = rawInput
    .trim()
    .split('\n')
    .map(m => m.match(/x=(-?\d+), y=(-?\d+), z=(-?\d+)/).slice(1, 4));

function part1() {
    const moons = moonConfigs.map((m, i) => new Moon(i, ...m));
    for (let i = 0; i < 1000; i++) {
        moons.forEach(moon => moon.applyGravity(moons));
        moons.forEach(moon => moon.applyVelocity(moons));
    }
    return moons.map(m => m.getTotalEnergy()).reduce((a, b) => a + b);
}

function part2() {
    const moons = moonConfigs.map((m, i) => new Moon(i, ...m));
    const initialX = moons.map(m => m.position[0]).join('|'),
          initialY = moons.map(m => m.position[1]).join('|'),
          initialZ = moons.map(m => m.position[2]).join('|');
    let xCycle = 0, 
        yCycle = 0,
        zCycle = 0;
    
    let i = 1;
    while (!xCycle || !yCycle || !zCycle) {
        moons.forEach(moon => moon.applyGravity(moons));
        moons.forEach(moon => moon.applyVelocity(moons));
        i++;
        if (!xCycle) {
            let x = moons.map(m => m.position[0]).join('|');
            xCycle = x === initialX ? i : 0;
        }
        if (!yCycle) {
            let y = moons.map(m => m.position[1]).join('|');
            yCycle = y === initialY ? i : 0;
        }
        if (!zCycle) {
            let z = moons.map(m => m.position[2]).join('|');
            zCycle = z === initialZ ? i : 0;
        }
    }
    return lcm([xCycle, yCycle, zCycle]);
}

console.log(part1());
console.log(part2());