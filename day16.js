const rawInput = `59773775883217736423759431065821647306353420453506194937477909478357279250527959717515453593953697526882172199401149893789300695782513381578519607082690498042922082853622468730359031443128253024761190886248093463388723595869794965934425375464188783095560858698959059899665146868388800302242666479679987279787144346712262803568907779621609528347260035619258134850854741360515089631116920328622677237196915348865412336221562817250057035898092525020837239100456855355496177944747496249192354750965666437121797601987523473707071258599440525572142300549600825381432815592726865051526418740875442413571535945830954724825314675166862626566783107780527347044
`;

const numArray = [...rawInput.trim()].map(n => parseInt(n));
const masks = [];
for (let i = 0; i < numArray.length; i++) {
    let pattern = [];
    while (pattern.length <= numArray.length + 1) {
        for (let j = 0; j <= i; j++) {
            pattern.push(0);
        }
        for (let j = 0; j <= i; j++) {
            pattern.push(1);
        }
        for (let j = 0; j <= i; j++) {
            pattern.push(0);
        }
        for (let j = 0; j <= i; j++) {
            pattern.push(-1);
        }
    }
    pattern = pattern.slice(1, numArray.length + 1);
    masks.push(pattern);
}

function part1() {
    let numbers = [...numArray];
    for (let i = 0; i < 100; i++) {
        numbers = numbers.map((_, i) => {
            let mask = masks[i];
            return Math.abs(numbers.map((n, i) => n * mask[i]).reduce((a, b) => a + b)) % 10;
        });
    }
    return numbers.slice(0, 8).join('');
}

function part2() {
    const start = parseInt(numArray.slice(0,7).join(''));
    const end = numArray.length * 10000 - 1;
    let numbers = [];
    for (let i = end; i >= start; i--) {
        numbers.push(numArray[i % numArray.length]);
    }

    for (let i = 0; i < 100; i++) {
        let newNumbers = [];
        for (let j = 0; j < numbers.length; j++) {
            if (j === 0) {
                newNumbers.push(numbers[j]);
            } else {
                newNumbers.push(Math.abs(newNumbers[j-1] + numbers[j]) % 10);
            }
        }
        numbers = newNumbers;
    }

    return numbers.slice(numbers.length - 8).reverse().join('');
}

console.log(part1());
console.log(part2());