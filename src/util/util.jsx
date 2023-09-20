export function msToTime(ms) {
    let seconds = ms / 1000;
    let hours = parseInt( seconds / 3600 ); // 3600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    seconds = seconds % 60;

    // Format hours, minutes, and seconds as 2-digit numbers
    hours = hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    minutes = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    seconds = Math.round(seconds).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    return `${hours}:${minutes}:${seconds}`;
}
