const { LeftChat } = require("./LeftChat");

test("parses when Bob leaves the chat", () => {
  expect(LeftChat("Bob has left the chat")).toEqual("Bob");
});

test("parses when Bob Smith leaves the chat", () => {
  expect(LeftChat("Bob Smith has left the chat")).toEqual("Bob Smith");
});

test("does not parse when extraneous words are there", () => {
  expect(LeftChat("Bob has left the amazing chat")).toEqual(false);
});

test("does not parse when the phrase 'has left the chat' is not present", () => {
  expect(LeftChat("Bob is gone")).toEqual(false);
});
