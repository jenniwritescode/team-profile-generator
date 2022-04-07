//tests for Employee class
const Employee = require("../lib/Employee");

describe("Employee", () => {
  describe("initalization", () => {
    const employee = new Employee("Cady Heron", 6, "cady@email.com");
    it("should return employee name", () => {
      expect(employee.getName()).toEqual("Cady Heron");
    });
    it("should return employee id", () => {
      expect(employee.getId()).toEqual(6);
    });
    it("should return employee email", () => {
      expect(employee.getEmail()).toEqual("cady@email.com");
    });
    it("should return 'Employee' as the role", () => {
      expect(employee.getRole()).toEqual("Employee");
    });
  });
});
