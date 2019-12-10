'use strict';
/*
    Define a slot machine with 3 reels that can individually spin(), and then display()
    the current contents of all the reels.

    The basic behavior of a single reel is defined in the reel object below. But the
    slot machine needs individual reels -- objects that delegate to reel, and which each
    have a position property.

    A reel only knows how to display() its current slot symbol, but a slot machine
    typically shows 3 symbols per reel: the current slot (position), one slot above
    (position - 1), and one slot below (position + 1). So displaying the slot machine
    should end up displaying a 3 x 3 grid of slot symbols.

    Note: I really disagree with the suggested solution, because I think it is more
    naturally to make a reel show all three values: previous, current and next. And the
    suggested solution is less readable and understandable.
*/

function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
    symbols: ["♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"],
    spin() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1);
        }
        this.position = (
            this.position + 100 + randMax(100)
        ) % this.symbols.length;
    },
    setPosition() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1);
        }
    },
    display() {
        this.setPosition();
        return this.symbols[this.position];
    },
    displayPrevious() {
        this.setPosition();
        return this.symbols[this.position - 1 < 0 ? this.symbols.length - 1 : this.position - 1];
    },
    displayNext() {
        this.setPosition();
        return this.symbols[this.position + 1 >= this.symbols.length ? 0 : this.position + 1];
    }
};

var slotMachine = {
    reels: [
        Object.create(reel),
        Object.create(reel),
        Object.create(reel),
    ],
    spin() {
        this.reels.forEach(function spinReel(reel) {
            reel.spin();
        });
    },
    display() {
        const displayFunctions = [
            reel => reel.displayPrevious(),
            reel => reel.display(),
            reel => reel.displayNext(),
        ];

        const createRow = displayFunction => this.reels.map(displayFunction).join(' | ');
        return displayFunctions.map(displayFunction => createRow(displayFunction)).join('\n');
    }
};

slotMachine.spin();
console.log(slotMachine.display());
// ☾ | ☀ | ★
// ☀ | ♠ | ☾
// ♠ | ♥ | ☀

console.log('\n');

slotMachine.spin();
console.log(slotMachine.display());
// ♦ | ♠ | ♣
// ♣ | ♥ | ☺
// ☺ | ♦ | ★