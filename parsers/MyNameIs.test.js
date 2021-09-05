const { MyNameIs } = require("./MyNameIs");

test("parses a name with no spaces", () => {
  expect(MyNameIs("My name is Bob.")).toEqual({ name: "Bob", host: false });
});

test("parses a name with a space", () => {
  expect(MyNameIs("My name is Bob Smith.")).toEqual({
    name: "Bob Smith",
    host: false,
  });
});

test("parses a name with spaces and host", () => {
  expect(MyNameIs("My name is Bob. I am the host.")).toEqual({
    name: "Bob",
    host: true,
  });
});

test("parses a name with a space and host", () => {
  expect(MyNameIs("My name is Bob Smith. I am the host.")).toEqual({
    name: "Bob Smith",
    host: true,
  });
});

test("does not return anything when the string is 'I am the host.'", () => {
  expect(MyNameIs("I am the host.")).toEqual(false);
});

test("does not return anything when the keywords are in the middle of the string", () => {
  expect(MyNameIs("Hi there, My name is Bob Smith.")).toEqual(false);
});

test("does not return anything when none of the keywords are present", () => {
  expect(MyNameIs("Bob Smith")).toEqual(false);
});
