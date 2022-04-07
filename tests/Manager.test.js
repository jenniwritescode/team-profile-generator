//tests for Manager class
const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("initalization", () => {
    const manager = new Manager(
      "Regina George",
      2,
      "regina@email.com",
      "847-555-1212"
    );
    it("should return manager's office number", () => {
      expect(manager.getOfficeNumber()).toEqual("847-555-1212");
    });

    it("should return 'Manager' as the role", () => {
      expect(manager.getRole()).toEqual("Manager");
    });
  });
});