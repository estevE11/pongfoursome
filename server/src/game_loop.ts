import { setImmediate } from "https://deno.land/std@0.140.0/node/timers.ts";

type Callback = (delta: number) => void;

export class GameLoop {
    private tickRate: number;
    private running: boolean;
    private timerID?: ReturnType<typeof setTimeout>;
    private lastRunTime: number;
    private cb: Callback;
    private boundRun: () => void;

    constructor(fps) {
        this.tickRate = 1000 / fps;
        this.running = false;
        this.lastRunTime = 0;
        this.boundRun = this.run.bind(this);
    }

    stop() {
        this.running = false;
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = undefined;
        }
    }

    start(cb: Callback): void {
        this.running = true;
        this.lastRunTime = Date.now();
        this.cb = cb;

        this.run();
    }

    private run() {
        if (!this.running) {
            return;
        }

        const currentTime = Date.now();
        const diff = currentTime - this.lastRunTime;

        this.cb(diff);

        const opDiff = Date.now() - currentTime;
        this.lastRunTime = currentTime;

        if (opDiff < this.tickRate) {
            this.timerId = setTimeout(this.boundRun, this.tickRate - opDiff);
        } else {
            setImmediate(this.boundRun);
        }
    }
}