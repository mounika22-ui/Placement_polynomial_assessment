const fs = require("fs");

function charToValue(ch) {
    if (ch >= "0" && ch <= "9") {
        return BigInt(ch.charCodeAt(0) - 48);
    }

    if (ch >= "a" && ch <= "z") {
        return BigInt(ch.charCodeAt(0) - 87);
    }

    if (ch >= "A" && ch <= "Z") {
        return BigInt(ch.charCodeAt(0) - 55);
    }

    throw new Error("Invalid character: " + ch);
}

function convertBase(value, base) {
    let result = 0n;
    const b = BigInt(base);

    for (const ch of value) {
        const digit = charToValue(ch);

        if (digit >= b) {
            throw new Error(`Invalid digit ${ch} for base ${base}`);
        }

        result = result * b + digit;
    }

    return result;
}

function gcd(a, b) {
    while (b !== 0n) {
        const temp = a % b;
        a = b;
        b = temp;
    }

    return a < 0n ? -a : a;
}

class Fraction {
    constructor(numerator, denominator = 1n) {
        if (denominator === 0n) {
            throw new Error("Denominator cannot be zero");
        }

        if (denominator < 0n) {
            numerator = -numerator;
            denominator = -denominator;
        }

        const g = gcd(
            numerator < 0n ? -numerator : numerator,
            denominator
        );

        this.numerator = numerator / g;
        this.denominator = denominator / g;
    }

    add(other) {
        return new Fraction(
            this.numerator * other.denominator +
            other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }

    multiply(other) {
        return new Fraction(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        );
    }
}

function solve(filename) {
    const input = fs.readFileSync(filename, "utf8");
    const data = JSON.parse(input);

    const n = Number(data.keys.n);
    const k = Number(data.keys.k);

    const points = Object.keys(data)
        .filter(key => key !== "keys")
        .map(key => {
            const base = Number(data[key].base);
            const value = data[key].value;

            return {
                x: BigInt(key),
                y: convertBase(value, base)
            };
        })
        .sort((a, b) => {
            if (a.x < b.x) return -1;
            if (a.x > b.x) return 1;
            return 0;
        });

    const selected = points.slice(0, k);

    let answer = new Fraction(0n);

    for (let i = 0; i < k; i++) {
        const xi = selected[i].x;
        const yi = selected[i].y;

        let term = new Fraction(yi);

        for (let j = 0; j < k; j++) {
            if (i === j) continue;

            const xj = selected[j].x;

            term = term.multiply(
                new Fraction(-xj, xi - xj)
            );
        }

        answer = answer.add(term);
    }

    return answer.numerator.toString();
}

console.log("Test Case 1 Answer:", solve("testcase1.json"));
console.log("Test Case 2 Answer:", solve("testcase2.json"));