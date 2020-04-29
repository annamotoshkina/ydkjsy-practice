/*
    This exercise is to convert the calculator from Closure (PART 3) into a module.

    We're not adding any additional functionality to the calculator, only changing its interface. 
    Instead of calling a single function calc(..), we'll be calling specific methods on the 
    public API for each "keypress" of our calculator. The outputs stay the same.

    This module should be expressed as a classic module factory function called calculator(), 
    instead of a singleton IIFE, so that multiple calculators can be created if desired.

    The public API should include the following methods:
    number(..) (input: the character/number "pressed")
    plus()
    minus()
    mult()
    div()
    eq()
*/

function calculator() {
    let result = 0;
    let operation = '+';
    let nextNumber = '';
    let isFirstSymbol = true;

    const calculate = _ => {
        const number = Number(nextNumber);
        switch (operation) {
            case '+':
                result = result + number;
                break;
            case '-':
                result = result - number;
                break;
            case '*': 
                result = result * number;
                break;
            case '/':
                result = result / number;
                break;
            default: 
                throw new Error(`Unsupported operation '${operation}'.`);
        }
        nextNumber = '';
    };

    const setNewOperation = operationSymbol => {
        calculate();
        operation = operationSymbol;
        isFirstSymbol = false;
        return operationSymbol;
    };

    function formatTotal(display) {
        if (Number.isFinite(display)) {
            // constrain display to max 11 chars
            let maxDigits = 11;
            // reserve space for "e+" notation?
            if (Math.abs(display) > 99999999999) {
                maxDigits -= 6;
            }
            // reserve space for "-"?
            if (display < 0) {
                maxDigits--;
            }
    
            // whole number?
            if (Number.isInteger(display)) {
                display = display
                    .toPrecision(maxDigits)
                    .replace(/\.0+$/,"");
            } else { // decimal
                // reserve space for "."
                maxDigits--;
                // reserve space for leading "0"?
                if (
                    Math.abs(display) >= 0 &&
                    Math.abs(display) < 1
                ) {
                    maxDigits--;
                }
                display = display
                    .toPrecision(maxDigits)
                    .replace(/0+$/,"");
            }
        } else {
            display = "ERR";
        }
        return display;
    }

    return {
        number(symbol) {
            if (isFirstSymbol) {
                result = 0;
                operation = '+';
            }
            nextNumber = nextNumber.concat(symbol);
            isFirstSymbol = false;
            return symbol;
        },
        plus() {
            return setNewOperation('+');
        },
        minus() {
            return setNewOperation('-');
        },
        mult() {
            return setNewOperation('*');
        },
        div() {
            return setNewOperation('/');
        },
        eq() {
            calculate();
            isFirstSymbol = true;
            return formatTotal(result);
        },
    };
};

var calc = calculator();

/*console.log(calc.number("4"));     // 4
console.log(calc.plus());          // +
console.log(calc.number("7"));     // 7
console.log(calc.number("3"));     // 3
console.log(calc.minus());         // -
console.log(calc.number("2"));     // 2
console.log(calc.eq());            // 75*/

function useCalc(calc,keys) {
    var keyMappings = {
        "+": "plus",
        "-": "minus",
        "*": "mult",
        "/": "div",
        "=": "eq"
    };

    return [...keys].reduce(
        function showDisplay(display,key){
            var fn = keyMappings[key] || "number";
            var ret = String( calc[fn](key) );
            return (
                display +
                (
                  (ret != "" && key == "=") ?
                      "=" :
                      ""
                ) +
                ret
            );
        },
        ""
    );
}

console.log(useCalc(calc,"4+3="));           // 4+3=7
console.log(useCalc(calc,"+9="));            // +9=16
console.log(useCalc(calc,"*8="));            // *8=128
console.log(useCalc(calc,"7*2*3="));         // 7*2*3=42
console.log(useCalc(calc,"1/0="));           // 1/0=ERR
console.log(useCalc(calc,"+3="));            // +3=ERR
console.log(useCalc(calc,"51="));            // 51=51