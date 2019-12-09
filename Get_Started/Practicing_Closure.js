'use strict';
/*
    The range(..) function takes a number as its first argument, representing the first
    number in a desired range of numbers. The second argument is also a number
    representing the end of the desired range (inclusive). If the second argument is
    omitted, then another function should be returned that expects that argument.
*/

const isCorrectNumber = n => typeof start !== 'number' || Number.isNaN(Number(n)) || Number(n) < 0;

function range(start, end) {
    if (!isCorrectNumber(start)) throw new TypeError('The first argument should be a positive number.');

    function createRange(end) {
        if (!isCorrectNumber(end)) throw new TypeError('The second argument should be a number.');

        const length = end - start + 1; // + 1 because the end is inclusive
        if (length < 0) return [];

        return new Array(length).fill(undefined).map((_, index) => start + index);
    }

    if (end === undefined) {
        return createRange;
    } else {
        return createRange(end);
    }
}

console.log(range(3, 3));    // [3]
console.log(range(3, 8));    // [3,4,5,6,7,8]
console.log(range(3, 0));    // []

var start3 = range(3);
var start4 = range(4);

console.log(start3(3));     // [3]
console.log(start3(8));     // [3,4,5,6,7,8]
console.log(start3(0));     // []

console.log(start4(6));     // [4,5,6]