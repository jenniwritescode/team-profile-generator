//tests for Intern class
const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("initalization", () => {
    const intern = new Intern(
      "Janis Ian",
      10,
      "janis@email.com",
      "North Shore High School"
    );
    it("should return intern's school", () => {
      expect(intern.getSchool()).toEqual("North Shore High School");
    });

    it("should return 'Intern' as the role", () => {
      expect(intern.getRole()).toEqual("Intern");
    });
  });
});