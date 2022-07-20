class Babysitter {
    constructor() {
        this.hourlyRateFromStartToBedtime = 12;
        this.hourlyRateFromBedtimeToMidnight = 8;
        this.hourlyRateFromMidnightToEnd = 16;
        this.startTime;
        this.bedTime;
        this.endTime;
        this.hoursFromStartToBedtime = 0;
        this.hoursFromBedtimeToMidnight = 0;
        this.hoursFromMidnightToEnd = 0;
    }

    /**
     *
     * @param {string} str : A time string to be converted.
     * @returns An integer representing the hour value in a 24H clock.
     */
    static convertTimeStringToInteger(str) {
        const regex24Hour = RegExp("^(2[0-4]|[01]?[0-9]):([0-5]?[0-9])$");
        if (regex24Hour.test(str)) {
            // if time has non-zero minute value, throw an error
            if (str.substring(3) !== "00") {
                throw new Error("Input time must not have fractional hours!");
            }
            return parseInt(str.substring(0, 2));
        } else {
            throw new Error("Input time must be in HH:MM format!");
        }
    }

    /**
     * @param {number} time : start time in 24H format, must not be before 17
     */
    set workerStartTime(time) {
        if (typeof time === "string") {
            time = Babysitter.convertTimeStringToInteger(time);
        }
        if (time < 17) {
            throw new Error("Start Time must be before 5:00 PM!");
        }
        this.startTime = time;
    }

    /**
     * @param {number} time : bedtime in 24H format, must not be later than
     *      midnight
     */
    set babyBedTime(time) {
        if (typeof time === "string") {
            time = Babysitter.convertTimeStringToInteger(time);
        }
        if (time > 0 && time < 5 && time !== 24) {
            throw new Error("Bedtime must be before 12:00 AM!");
        }
        // convert an input of 0 (midnight) to 24 for easier calculation
        if (time === 0) {
            this.bedTime = 24;
        } else {
            this.bedTime = time;
        }
    }

    /**
     * @param {number} time : end time in 24H format, must not be later than 4
     */
    set workerEndTime(time) {
        if (typeof time === "string") {
            time = Babysitter.convertTimeStringToInteger(time);
        }
        if (time > 4) {
            throw new Error("End Time must be before 4:00 AM!");
        }
        // convert an input of 0 (midnight) to 24 for easier calculation
        if (time === 0) {
            this.endTime = 24;
        } else {
            this.endTime = time;
        }
    }

    /**
     * Calculate charge with different types of hours worked and their hourly
     * rates.
     *
     * @returns total charge based on hours worked
     */
    calculateCharge() {
        // Check if there is any fractional hours
        if (!Number.isInteger(this.hoursFromStartToBedtime)) {
            throw new Error(
                "Illegal hoursFromStartToBedtime: Has to be a whole number"
            );
        }
        if (!Number.isInteger(this.hoursFromBedtimeToMidnight)) {
            throw new Error(
                "Illegal hoursFromBedtimeToMidnight: Has to be a whole number"
            );
        }
        if (!Number.isInteger(this.hoursFromMidnightToEnd)) {
            throw new Error(
                "Illegal hoursFromMidnightToEnd: Has to be a whole number"
            );
        }
        return (
            this.hoursFromStartToBedtime * this.hourlyRateFromStartToBedtime +
            this.hoursFromBedtimeToMidnight *
                this.hourlyRateFromBedtimeToMidnight +
            this.hoursFromMidnightToEnd * this.hourlyRateFromMidnightToEnd
        );
    }

    /**
     * Calculates time three time intervals, from start to bedtime, from bedtime
     * to midnight, and from midnight to end, given current state of start time,
     * bedtime, and end time.
     *
     * @updates this.hoursFromStartToBedtime, this.hoursFromBedtimeToMidnight,
     *      this.hoursFromMidnightToEnd
     */
    calculateTimeIntervals() {
        // check for illegal time relations
        if (this.startTime > this.bedTime) {
            throw new Error("Start time must be before bedtime!");
        }
        this.hoursFromStartToBedtime = this.bedTime - this.startTime;
        this.hoursFromBedtimeToMidnight = 24 - this.bedTime;
        this.hoursFromMidnightToEnd = this.endTime;
    }
}

module.exports = { Babysitter };
