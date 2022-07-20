// Setup Mocha and Chai
const { describe } = require("mocha");
const expect = require("chai").expect;
// Import Babysitter class
const Babysitter = require("../src/main").Babysitter;

// Babysitter class base
describe("Babysitter constructor", function () {
    let babysitter;

    beforeEach(function () {
        babysitter = new Babysitter();
    });

    it("should have a constant hourlyRateFromStartToBedtime", function () {
        expect(babysitter.hourlyRateFromStartToBedtime).to.equal(12);
    });
    it("should have a constant hourlyRateFromBedtimeToMidnight", function () {
        expect(babysitter.hourlyRateFromBedtimeToMidnight).to.equal(8);
    });
    it("should have a constant hourlyRateFromMidnightToEnd", function () {
        expect(babysitter.hourlyRateFromMidnightToEnd).to.equal(16);
    });
    it("should have a setter property startTime", function () {
        expect(babysitter).to.have.property("workerStartTime");
    });
    it("should have a setter property bedTime", function () {
        expect(babysitter).to.have.property("babyBedTime");
    });
    it("should have a setter property endTime", function () {
        expect(babysitter).to.have.property("workerEndTime");
    });
});

// Function Babysitter.calculateCharge
describe("Babysitter.calculateCharge", function () {
    let babysitter;

    beforeEach(function () {
        babysitter = new Babysitter();
    });

    it("should have a function to calculate charge", function () {
        expect(babysitter.calculateCharge).to.be.a("function");
    });
    it("should charge 0 if not showing up", function () {
        expect(babysitter.calculateCharge()).to.equal(0);
    });
    it("should not accept fractional hours from start to bedtime", function () {
        babysitter.hoursFromStartToBedtime = 1.5;
        expect(function () {
            babysitter.calculateCharge();
        }).to.throw(
            "Illegal hoursFromStartToBedtime: Has to be a whole number"
        );
    });
    it("should not accept fractional hours from bedtime to midnight", function () {
        babysitter.hoursFromBedtimeToMidnight = 3.4;
        expect(function () {
            babysitter.calculateCharge();
        }).to.throw(
            "Illegal hoursFromBedtimeToMidnight: Has to be a whole number"
        );
    });
    it("should not accept fractional hours from midnight to finish", function () {
        babysitter.hoursFromMidnightToEnd = 7.3;
        expect(function () {
            babysitter.calculateCharge();
        }).to.throw("Illegal hoursFromMidnightToEnd: Has to be a whole number");
    });
    it("should correctly calculate charge", function () {
        babysitter.hoursFromStartToBedtime = 2;
        babysitter.hoursFromBedtimeToMidnight = 2;
        expect(babysitter.calculateCharge()).to.be.equal(40);
    });
});

// Time setters
describe("Babysitter time setters", function () {
    let babysitter;

    beforeEach(function () {
        babysitter = new Babysitter();
    });

    it("should be able to set start time", function () {
        babysitter.workerStartTime = 18;
        expect(babysitter.startTime).to.be.equal(18);
    });
    it("should be able to set bedtime", function () {
        babysitter.workerStartTime = 22;
        expect(babysitter.startTime).to.be.equal(22);
    });
    it("should be able to set end time", function () {
        babysitter.workerEndTime = 4;
        expect(babysitter.endTime).to.be.equal(4);
    });
    it("should reject a start time before 5:00 PM", function () {
        expect(function () {
            babysitter.workerStartTime = 16;
        }).to.throw("Start Time must be before 5:00 PM!");
    });
    it("should reject a bedtime after midnight", function () {
        expect(function () {
            babysitter.babyBedTime = 1;
        }).to.throw("Bedtime must be before 12:00 AM!");
    });
    it("should reject an end time after 4:00 AM", function () {
        expect(function () {
            babysitter.workerEndTime = 5;
        }).to.throw("End Time must be before 4:00 AM!");
    });
});

// Function Babysitter.calculateTimeIntervals
describe("Babysitter.calculateTimeIntervals", function () {
    let babysitter;

    beforeEach(function () {
        babysitter = new Babysitter();
    });

    it("should have a function to calculate time intervals", function () {
        expect(babysitter.calculateTimeIntervals).to.be.a("function");
    });
    // edge cases
    it("should correctly calculate intervals when bedtime is midnight", function () {
        babysitter.workerStartTime = 17;
        babysitter.babyBedTime = 24;
        babysitter.workerEndTime = 4;
        babysitter.calculateTimeIntervals();
        expect(babysitter.hoursFromStartToBedtime).to.be.equal(7);
        expect(babysitter.hoursFromBedtimeToMidnight).to.be.equal(0);
        expect(babysitter.hoursFromMidnightToEnd).to.be.equal(4);
    });
    it("should correctly calculate charge when bedtime is start time", function () {
        babysitter.workerStartTime = 17;
        babysitter.babyBedTime = 17;
        babysitter.workerEndTime = 4;
        babysitter.calculateTimeIntervals();
        expect(babysitter.hoursFromStartToBedtime).to.be.equal(0);
        expect(babysitter.hoursFromBedtimeToMidnight).to.be.equal(7);
        expect(babysitter.hoursFromMidnightToEnd).to.be.equal(4);
    });
    // illegal time relations
    it("should throw an error when bedtime is before start time", function () {
        babysitter.workerStartTime = 20;
        babysitter.babyBedTime = 17;
        expect(function () {
            babysitter.calculateTimeIntervals();
        }).to.throw("Start time must be before bedtime!");
    });
});
