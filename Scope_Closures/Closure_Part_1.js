/*
    The first part of this exercise is to use closure to implement a cache to 
    remember the results of isPrime(..), so that the primality (true or false) 
    of a given number is only ever computed once.

    So the second part of the exercise is to use the same closure cache technique for factorize(..).
*/

const isPrime = (function () {
    const cache = {};

    return function (number) {
        if (typeof number !== 'number') throw new Error('Argument must be number.');
        if (cache[number]) return cache[number];

        const cacheAndReturn = value => {
            cache[number] = value;
            return value;
        }

        if (number <= 3) {
            return cacheAndReturn(number > 1);
        }
    
        if (number % 2 == 0 || number % 3 == 0) {
            return cacheAndReturn(false);
        }
    
        const sqrt = Math.sqrt(number);
        for (let i = 5; i <= sqrt; i += 6) {
            if (number % i == 0 || number % (i + 2) == 0) {
                return cacheAndReturn(false);
            }
        }
        return cacheAndReturn(true);
    }
})();

console.log(isPrime(11));
console.log(isPrime(12));

const factorize = (function() {
    const cache = {};

    return function factorize(number) {
        if (typeof number !== 'number') throw new Error('Argument must be number.');
        if (cache[number]) return cache[number];

        const cacheAndReturn = value => {
            cache[number] = value;
            return value;
        }

        if (!isPrime(number)) {
            let i = Math.floor(Math.sqrt(number));
            while (number % i != 0) {
                i--;
            }
            
            return cacheAndReturn([
                ...factorize(i),
                ...factorize(number / i)
            ]);
        }
        
        return cacheAndReturn([number]);
    }
})();

console.log(factorize(11));
console.log(factorize(12)); 