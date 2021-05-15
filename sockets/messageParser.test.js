const { messageParser } = require('./messageParser');

test('parses a command and message', () => {
  expect(messageParser('chat: hi there')).toEqual({"command": "chat", "message": "hi there"});
});

test('parses a command with a colon in the message', () => {
  expect(messageParser('chat: hi there: welcome!')).toEqual({"command": "chat", "message": "hi there: welcome!"});
});

