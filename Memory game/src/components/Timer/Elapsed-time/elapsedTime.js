export  default function elapsedTime(events) {
    let elapsed = 0;

    for(let i=0; i < events.length; i+=2) {
        const start = events[i];
        const stop = events[i+1] || new Date();
        elapsed += stop - start
    }

    return elapsed;
}
