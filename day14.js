const rawInput = `15 RNMTG => 6 QSXV
21 MKJN => 9 KDFZ
1 KVFL, 4 NZWL => 3 FHDT
1 FZJXD, 2 SWZK, 1 QRLRS => 6 ZRNK
8 KVFL => 6 SBZKF
11 DXFB, 1 CPBXJ, 8 TXFCS, 1 ZPMHL, 1 BCHTD, 2 FZJXD, 2 WKZMQ, 1 NZWL => 8 MPLJ
5 KDFZ, 1 QSXV => 9 TXFCS
1 PMLGM, 21 CKVN => 3 KVFL
1 XFRLH, 3 QRLRS => 4 CKVN
5 KBJS, 15 XFRLH, 6 WZPZX, 15 KVFL, 4 DXFB, 4 ZPMHL, 11 JCKCK, 26 KFGPB => 9 BWVS
10 KNRDW, 2 XCML => 9 BCNL
26 LBLH => 9 KBJS
5 DTFBQ, 4 PJTD => 6 FHKSW
6 HTRFP, 1 FVXV, 4 JKLNF, 1 TXFCS, 2 PXBP => 4 JRBFT
21 DTFBQ => 9 JGQJ
2 KBJS => 3 FZJXD
24 LBLH => 6 QFMTZ
1 CBNJT => 7 LSCW
5 KVFL => 2 NZWL
12 DNHL, 4 BCNL => 4 LBLH
15 RHVG => 1 PJCWT
4 KDFZ, 1 KVFL => 3 BCHTD
2 XFDW, 7 BCHTD => 7 WKZMQ
2 SBZKF, 1 PLTX => 3 DXFB
1 PLTX, 11 HTRFP, 6 PMLGM => 1 JCKCK
1 TQCX, 10 DNHL => 8 DTFBQ
2 TQCX, 2 KTBFB => 5 RHVG
8 MVFW => 3 CPBXJ
148 ORE => 4 CBNJT
9 CPBXJ, 5 DTFBQ => 6 PMLGM
11 ZXCF, 15 PJCWT, 4 FZJXD => 7 PJTD
1 JGQJ => 6 DCBNV
4 LSCW, 16 BCNL => 7 MVFW
1 RHVG => 4 XFDW
8 MPLJ, 16 JRBFT, 43 KBJS, 11 NZWL, 4 BWVS, 22 ZPMHL => 1 FUEL
1 QFMTZ, 3 CKVN => 5 PLTX
5 CKVN, 10 SWZK => 7 HTRFP
2 PXBP, 1 QRLRS, 7 KTBFB => 7 NDZGV
1 QRLRS, 9 KBJS, 2 TQCX => 2 SWZK
9 TZKZ, 3 ZRNK, 4 PXBP => 4 FVXV
1 PMLGM, 1 SWZK, 6 FZJXD => 7 MKJN
16 MVFW, 2 KBJS => 7 ZXCF
1 MVFW => 6 HVGF
1 LSCW, 1 HVGF => 8 RNMTG
5 ZRNK, 1 TQCX => 3 PXBP
130 ORE => 5 KNRDW
1 RHVG, 2 KFGPB, 1 LSCW => 7 QRLRS
6 XFRLH => 8 TZKZ
24 HVGF, 8 KTBFB => 1 XFRLH
2 KNRDW, 2 CBNJT => 6 DNHL
1 FHDT => 4 JKLNF
1 QSXV, 10 XFGZX, 2 DCBNV => 8 ZPMHL
1 FHDT, 7 NDZGV => 4 WZPZX
11 FHKSW => 5 XFGZX
10 LSCW => 8 KTBFB
133 ORE => 1 XCML
8 XCML => 4 TQCX
6 CPBXJ, 8 CBNJT => 6 KFGPB
`;

class Chemical {
    constructor(name) {
        this.name = name;
        this.requiredBy = [];
        this.produces = 0;
        this.requires = {};
        this.amountRequired = 0;
        this.canCalculateCost = false;
    }

    addRequiredBy(requiredBy) {
        this.requiredBy.push(requiredBy);
    }

    setProduction(chemicalReactions, req, outN) {
        this.produces = parseInt(outN);
        req.match(/(\d+) (\w+)/g).forEach(r => {
            const [n, type] = r.split(' ');
            this.requires[type] = parseInt(n);
            if (!chemicalReactions[type]) {
                chemicalReactions[type] = new Chemical(type);
            }
            chemicalReactions[type].addRequiredBy(this.name);
        });
    }

    updateRequires(chemicalReactions, noRound = false) {
        this.canCalculateCost = true;
        let multiplesNeeded = this.amountRequired / this.produces;
        if (!noRound) {
            multiplesNeeded = Math.ceil(multiplesNeeded);
        }
        Object.keys(this.requires).forEach(t => {
            chemicalReactions[t].amountRequired += this.requires[t] * multiplesNeeded;
        });
    }
}

const reactionInstructions = rawInput.trim().split('\n')
    .map(e => e.match(/^(.+) => (\d+) (\w+)$/));

function calculate(targetFuel = 1, approximate = false) {
    const chemicalReactions = {};
    reactionInstructions.forEach(r => {
        const [req, outN, out] = r.slice(1, 4);
        if (!chemicalReactions[out]) {
            chemicalReactions[out] = new Chemical(out);
        }
        chemicalReactions[out].setProduction(chemicalReactions, req, outN);
    });

    chemicalReactions['FUEL'].amountRequired = targetFuel;
    chemicalReactions['ORE'].produces = 1;

    let queue = ['FUEL'];
    let queueSet = new Set(queue);
    while (queue.length) {
        const type = queue.shift();
        queueSet.delete(type);
        let chemical = chemicalReactions[type];
        if (chemical.requiredBy.filter(t => !chemicalReactions[t].canCalculateCost).length) {
            if (!queueSet.has(type)) {
                queue.push(type)
                queueSet.add(type);
            }
            continue;
        }
        chemical.updateRequires(chemicalReactions, approximate);
        let newItems = Object.keys(chemical.requires).filter(t => !queueSet.has(t));
        queueSet = new Set([...queueSet, ...newItems]);
        queue = [...queue, ...newItems];
    }

    return chemicalReactions;
}

function part1() {
    const chemicalReactions = calculate();
    return chemicalReactions['ORE'].amountRequired;
}

function part2() {
    const trillion = 1000000000000;
    let chemicalReactions = calculate(1, true);
    const lowerBound = Math.floor(trillion / chemicalReactions['ORE'].amountRequired) - 100;

    let i = lowerBound;
    chemicalReactions = calculate(i);
    while (chemicalReactions['ORE'].amountRequired <= trillion) {
        i++;
        chemicalReactions = calculate(i);
    }
    return i - 1;
}

console.log(part1());
console.log(part2());