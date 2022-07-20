/**
 * This test suite checks additional input format for the three timepoints:
 * start time, bedtime, and end time. It expects that the program accepts
 * a single integer in 24H format (e.g., 12, 17), as well as a time string in
 * 24H format (e.g., 14:00, 22:00).
 */

// Setup Mocha and Chai
const { describe } = require("mocha");
const expect = require("chai").expect;
// Import Babysitter class
const Babysitter = require("../src/main").Babysitter;

// Input time string in 24H format
describe("Input time string in 24H format", function () {
    let babysitter;

    beforeEach(function () {
        babysitter = new Babysitter();
    });
    // regular cases
    it("should accept 18:00 as 18", function () {
        babysitter.workerStartTime = "18:00";
        expect(babysitter.startTime).to.equal(18);
    });
    // edge cases
    it("should accept 24:00 as 24", function () {
        babysitter.babyBedTime = "24:00";
        expect(babysitter.bedTime).to.equal(24);
    });
    it("should accept 00:00 as 24", function () {
        babysitter.workerEndTime = "00:00";
        expect(babysitter.endTime).to.equal(24);
    });
    // illegal cases
    it("should not accept non HH:MM format string", function () {
        expect(function () {
            babysitter.workerStartTime = "BadBadInput";
        }).to.throw("Input time must be in HH:MM format!");
    });
    it("should reject fractional hours", function () {
        expect(function () {
            babysitter.workerEndTime = "03:31";
        }).to.throw("Input time must not have fractional hours!");
    });
});
