const { parser } = require('./parser');

test('parses a command and message', () => {
  expect(parser('chat: hi there')).toEqual({"command": "chat", "message": "hi there"});
});

test('parses a command with a colon in the message', () => {
  expect(parser('chat: hi there: welcome!')).toEqual({"command": "chat", "message": "hi there: welcome!"});
});

