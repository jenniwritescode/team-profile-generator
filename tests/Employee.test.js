// tests for employee class
const { hasUncaughtExceptionCaptureCallback } = require('process');
const { isTypedArray } = require('util/types');
const Employee = require('../lib/Employee');

describe("Employee", (name, id, email) => {
    describe("get employee name", () => {
        it("should return employee name", () => {
            const name = "Cady Heron";
            const result = new Employee().getName();
            expect(result).toEqual(name); 
        });
    });

    describe("get employee id", () => {
        it("should return employee id", () => {
            const id = "6";
            const result = new Employee().getId();
            expect(result).toEqual(id); 
        });
    });

    describe("get employee email", () => {
        it("should return employee email", () => {
            const email = "cady@email.com";
            const result = new Employee().getEmail();
            expect(result).toEqual(email); 
        });
    });

    describe("get employee role", () => {
        it("should return 'Employee' as the role", () => {
            const result = new Employee().getRole();
            expect(result).toEqual("Employee"); 
        });
    });
});