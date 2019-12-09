'use strict';
/*
    scheduleMeeting(..) should take a start time (in 24hr format as a string "hh:mm") and a meeting
    duration (number of minutes). It should return true if the meeting falls entirely within the
    work day (according to the times specified in dayStart and dayEnd); return false if the meeting
    violates the work day bounds.
*/

const MINUTES_IN_HOUR = 60;
const dayStart = "07:30";
const dayEnd = "17:45";

const splitTimeString = timeString => timeString.split(':').map(item => Number(item));

const [dayStartHours, dayStartMinutes] = splitTimeString(dayStart);
const [dayEndHours, dayEndMinutes] = splitTimeString(dayEnd);

function scheduleMeeting(startTime, durationMinutes) {
    if (typeof startTime !== 'string' || !/\d?\d:\d\d/.test(startTime))
        throw new Error('The first argument should be a string in format "hh:mm".');
    if (typeof durationMinutes !== 'number' || Number.isNaN(Number(durationMinutes)) || Number(durationMinutes) < 0)
        throw new Error('The second argument should be a positive number.');

    const [startHours, startMinutes] = splitTimeString(startTime);
    const isTooEarly = startHours < dayStartHours || (startHours === dayStartHours && startMinutes < dayStartMinutes);
    if (isTooEarly) return false;

    const durationHours = Math.floor(durationMinutes / MINUTES_IN_HOUR);
    let endTimeHours = startHours + durationHours;
    let endTimeMinutes = startMinutes + durationMinutes % MINUTES_IN_HOUR;
    if (endTimeMinutes >= MINUTES_IN_HOUR) {
        endTimeHours += 1;
        endTimeMinutes -= MINUTES_IN_HOUR;
    }

    const isTooLate = endTimeHours > dayEndHours || (endTimeHours === dayEndHours && endTimeMinutes > dayEndMinutes);
    if (isTooLate) return false;

    return true;
}

console.log(scheduleMeeting("7:00", 15));     // false
console.log(scheduleMeeting("07:15", 30));    // false
console.log(scheduleMeeting("7:30", 30));     // true
console.log(scheduleMeeting("11:30", 60));    // true
console.log(scheduleMeeting("17:00", 45));    // true
console.log(scheduleMeeting("17:30", 30));    // false
console.log(scheduleMeeting("18:00", 15));    // false