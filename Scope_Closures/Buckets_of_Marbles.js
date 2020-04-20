'use strict';
/* 
    This exercise asks you to write a program—any program!—that contains nested functions and block scopes, 
    which satisfies these constraints:
        1. If you color all the scopes (including the global scope!) different colors, you need at least 
        six colors. Make sure to add a code comment labeling each scope with its color.
        BONUS: identify any implied scopes your code may have.
        2. Each scope has at least one identifier.
        3. Contains at least two function scopes and at least two block scopes.
        4. At least one variable from an outer scope must be shadowed by a nested scope variable 
        (see Chapter 3).
        5. At least one variable reference must resolve to a variable declaration at least two levels higher 
        in the scope chain.
*/

/* SCOPE 1 (global) */
const hobbits = [
    { firstName: 'frodo', lastName: 'baggins'},
    { firstName: 'merry', lastName: 'brandybuck'},
    { firstName: 'samwise', lastName: 'gamgee'},
    { firstName: 'pippin', lastName: 'took'},
];
const capitalize = word => word.slice(0, 1).toUpperCase() + word.slice(1); // SCOPE 7 (functional)

function processHobbits (hobbits) { // shadow global "hobbits"
    /* SCOPE 2 (functional) */
    hobbits.forEach(hobbit => {
        /* SCOPE 3 (functional) */
        /* "capitlize" resolves to a variable declaration two levels higher  in the scope chain */
        hobbit.firstName = capitalize(hobbit.firstName);
        hobbit.lastName = capitalize(hobbit.lastName);
    });
}

function printHobbits (/* SCOPE 4 (implied) */ hobbits = []) {
    /* SCOPE 5 (functional) */
    const print = function(string) {
        /* SCOPE 6 (functional) */
        console.log(string);
    } 

    if (hobbits.length === 0) {
        /* SCOPE 7 (block) */
        const result = 'No hobbits here :(';
        print(result);
    } else {
        /* SCOPE 8 (block) */
        const result = hobbits.map(hobbit => {
            const fullName = hobbit.firstName + ' ' + hobbit.lastName;
            return fullName;
        }).join(', ');
        print(result);
    }
}

processHobbits(hobbits);
printHobbits(hobbits);