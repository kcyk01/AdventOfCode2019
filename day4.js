const rawInput = `108457-562041`;
let [start, end] = rawInput.split('-').map(e => parseInt(e));

function applyIncDigitRule(passwordArray) {
    return passwordArray.filter(p => {
        let prevDigit = 99, digit;
        for (i = 0; i < 6; i++) {
            digit = Math.floor(p / Math.pow(10, i)) % 10;
            if (digit > prevDigit) {
                return false;
            }
            prevDigit = digit;
        }
        return true;
    });
}

function part1() {
    const doubleDigits = [];
    for (let i = start; i < end + 1; i++) {
        if (i.toString().match(/(\d)\1+/g)) {
            doubleDigits.push(i);
        }
    }
    const incDigits = applyIncDigitRule(doubleDigits);
    return incDigits.length;
}

function part2() {
    const doubleDigits = [];
    for (let i = start; i < end + 1; i++) {
        let matchedDigits = i.toString().match(/(\d)\1+/g);
        if (matchedDigits && matchedDigits.filter(p => p.length === 2).length) {
            doubleDigits.push(i);
        }
    }
    const incDigits = applyIncDigitRule(doubleDigits);
    return incDigits.length;
}

console.log(part1());
console.log(part2());