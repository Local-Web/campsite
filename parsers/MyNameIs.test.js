const { MyNameIs } = require("./MyNameIs");

test("parses a name with no spaces", () => {
  expect(MyNameIs("My name is Bob")).toEqual("Bob");
});

test("parses a name with a space", () => {
  expect(MyNameIs("My name is Bob Smith")).toEqual("Bob Smith");
});

test("does not return anything when the keywords are in the middle of the string", () => {
  expect(MyNameIs("Hi there, My name is Bob Smith")).toEqual(false);
});

test("does not return anything when none of the keywords are present", () => {
  expect(MyNameIs("Bob Smith")).toEqual(false);
});
