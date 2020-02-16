const fourUnitsConst = Math.log(4);

function calculateEntropy(indicators) {
    const { population, auto, accidents, injured, dead } = indicators;
    const autoPopulationUnit = calculateUnit(auto, population);
    const accidentsAutoUnit = calculateUnit(accidents, auto);
    const injuredAccidentsUnit = calculateInverseUnit(injured, accidents);
    const deadInjuredUnit = calculateUnit(dead, injured);

    const units = [autoPopulationUnit, accidentsAutoUnit, injuredAccidentsUnit, deadInjuredUnit];
    console.log(units);
    const positive = units.reduce((a, b) => a + b, 0);

    const entropy = -1 * units.reduce((acc, unit) => {
        const share = round(unit / positive);
        console.log(share);
        acc += round(share * Math.log(share));
        console.log(acc);
        return acc;
    }, 0);

    return round(entropy / fourUnitsConst, 3);
}

function calculateUnit(dividend, divider, accuracy=3) {
    const unit = Math.log(1 / (dividend / divider));
    return round(unit, accuracy);
}

function calculateInverseUnit(dividend, divider, accuracy=3) {
    const unit = Math.log(dividend / divider);
    return round(unit, accuracy);
}

function round(value, accuracy=3) {
    return +value.toFixed(accuracy);
}

export {
    calculateEntropy
};
