'use strict';

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this._refs = this._getRefs(selector);
        this._targetDate = targetDate;
        this._intervalId = this._startTimer();
    }

    _getRefs(root) {
        const refs = {};

        refs.daysRef = document.querySelector(`${root} [data-value="days"]`);
        refs.hoursRef = document.querySelector(`${root} [data-value="hours"]`);
        refs.minutesRef = document.querySelector(`${root} [data-value="mins"]`);
        refs.secondsRef = document.querySelector(`${root} [data-value="secs"]`);

        return refs;
    }

    _startTimer() {
        setInterval(() => {
            const currentDate = Date.now();
            const resultDate = this._targetDate - currentDate;

            if (resultDate < 0) {
                clearInterval(this._intervalId);
                return;
            }

            this._updateClockTime(resultDate);
        }, 1000);
    }

    _updateClockTime(time) {
        const days = this._pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this._pad(
            Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        const mins = this._pad(
            Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        );
        const secs = this._pad(Math.floor((time % (1000 * 60)) / 1000));

        this._refs.daysRef.textContent = days;
        this._refs.hoursRef.textContent = hours;
        this._refs.minutesRef.textContent = mins;
        this._refs.secondsRef.textContent = secs;
    }

    _pad(value) {
        return String(value).padStart(2, '0');
    }
}

const newYear = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jan 01, 2021'),
});
