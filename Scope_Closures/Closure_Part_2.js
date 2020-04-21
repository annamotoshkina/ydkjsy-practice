'use strict';
/*
    In this exercise, we're going to again practive closure by defining a toggle(..) utility that gives us a value toggler.
    You will pass one or more values (as arguments) into toggle(..), and get back a function. That returned function will 
    alternate/rotate between all the passed-in values in order, one at a time, as it's called repeatedly.
    The corner case of passing in no values to toggle(..) is not very important; such a toggler instance could just always 
    return undefined.
*/


function toggle() {
    const array = arguments;
    let currentIndex = 0;

    return function() {
        const returnValue = array[currentIndex];
        currentIndex++;
        if (currentIndex >= array.length) currentIndex = 0;
        return returnValue;
    };
}

var hello = toggle("hello");
var onOff = toggle("on","off");
var speed = toggle("slow","medium","fast");
var none = toggle();

console.log(hello());      // "hello"
console.log(hello());      // "hello"

console.log(onOff());      // "on"
console.log(onOff());      // "off"
console.log(onOff());      // "on"

console.log(speed());      // "slow"
console.log(speed());      // "medium"
console.log(speed());      // "fast"
console.log(speed());      // "slow"

console.log(none()); 