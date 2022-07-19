// Setup Mocha and Chai
const { describe } = require("mocha");
const expect = require("chai").expect;
// Import Babysitter class
const Babysitter = require("../src/main").Babysitter;

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
    it("should have a property startTime", function () {
        expect(babysitter).to.have.property("startTime");
    });
    it("should have a property bedTime", function () {
        expect(babysitter).to.have.property("bedTime");
    });
    it("should have a property endTime", function () {
        expect(babysitter).to.have.property("endTime");
    });
});

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

describe("Babysitter.calculateTimeInterval", function () {
    let babysitter;

    beforeEach(function () {
        babysitter = new Babysitter();
    });

    it("should have a function to calculate time interval", function () {
        expect(babysitter.calculateTimeInterval).to.be.a("function");
    });
});
