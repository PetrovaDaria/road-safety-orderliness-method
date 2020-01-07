function calculateEntropy(indicators) {
    const { population, auto, accidents, injured, dead } = indicators;
    const q1 = calculateQ(auto, population);
    const q2 = calculateQ(accidents, auto);
    const q3 = calculateQInverse(injured, accidents);
    const q4 = calculateQ(dead, injured);
    const qs = [q1, q2, q3, q4];
    const q = qs.reduce((a, b) => a + b, 0);

    const entropy = -1 * qs.reduce((acc, qi) => {
        const w = round(qi / q);
        acc += round(w * Math.log(w));
        return acc;
    }, 0);

    return round(entropy / Math.log(4), 3);
}

function calculateQ(dividend, divider, accuracy=4) {
    let q = Math.log(1 / (dividend / divider));
    return round(q, accuracy);
}

function calculateQInverse(dividend, divider, accuracy=4) {
    let q = Math.log(dividend / divider);
    return round(q, accuracy);
}

function round(value, accuracy=4) {
    return +value.toFixed(accuracy);
}

export {
    calculateEntropy
};
