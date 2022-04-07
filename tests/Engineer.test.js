//tests for Engineer class
const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("initalization", () => {
    const engineer = new Engineer(
      "Gretchen Weiners",
      8,
      "gretchen@email.com",
      "gretchenisfetch"
    );
    it("should return engineer github username", () => {
      expect(engineer.getGithub()).toEqual("gretchenisfetch");
    });

    it("should return 'Engineer' as the role", () => {
      expect(engineer.getRole()).toEqual("Engineer");
    });
  });
});
