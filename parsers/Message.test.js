const { Message } = require("./Message");

test("parses a name and message", () => {
  expect(Message("bob: hi there")).toEqual({
    name: "bob",
    text: "hi there",
  });
});

test("parses a name and message with a colon in the message", () => {
  expect(Message("bob: hi there: welcome!")).toEqual({
    name: "bob",
    text: "hi there: welcome!",
  });
});

test("does not return anything when there is no colon", () => {
  expect(Message("this has no colon")).toEqual(false);
});
