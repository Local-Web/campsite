const WebSocket = require("ws");
const { sendSocketMessage } = require("./messages/transport");
const { commands } = require("./messages/commands");
const { parser } = require("./messages/parser");

// Here's the new idea: add `messagesTypes` constant as a "dictionary", always pass the user state, 
// always receive the new user state. It's impure FP, but I think that gets us to where we want to be.

exports.socketsApp = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    let state = { username: '' };

    ws.on("message", (raw) => {
      let message;
      try {
        console.log("received: %s", raw);
        message = parser(raw);
        // TODO: either need to handle invalid messages here or have messageParser raise them
      } catch {
        console.log("Invalid message");
      } finally {
        if (commands.has(message.command)) {
          state = commands.get(message.command)({message, state});
          // TODO: replace this with the actual fulfillment of the command. Function might get
          // passed back?
          sendSocketMessage(ws, `success: ${message.command} fulfilled!`);
        } else {
          sendSocketMessage(ws, `Sorry, I could not process that command.`);
        }
      }
    });

    sendSocketMessage(ws, `Hi there, I am a WebSocket server`);
  });
};
