const WebSocket = require("ws");
const { broadcastMessage, sendSocketMessage } = require("./messages");
const { messageTypes } = require("./messageTypes");
const { messageParser } = require("./messageParser");

// Here's the new idea: add `messagesTypes` constant as a "dictionary", always pass the user state, 
// always receive the new user state. It's impure FP, but I think that gets us to where we want to be.

exports.socketsApp = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    let state = { username: '' };

    // Don't love this design: need to find a way of setting the state without bringing in so much of the
    // implementation here.
    //
    // This is going to be replaced with a `type` field on the message, which is then
    // used to .get() the handler from messageTypes. Each messageTypes function is going
    // to return the new userState.
    const handleMessage = (message) => {
      if (messageTypes.has(message.command)) {
        state = messageTypes.get(message.command)({message, state});
        // TODO: replace this with the actual fulfillment of the command. Function might get
        // passed back?
        sendSocketMessage(ws, `success: ${message.command} fulfilled!`);
      } else {
        sendSocketMessage(ws, `Sorry, I could not process that command.`);
      }
    }

    ws.on("message", (raw) => {
      let message;
      try {
        console.log("received: %s", raw);
        message = messageParser(raw);
        // TODO: either need to handle invalid messages here or have messageParser raise them
      } catch {
        console.log("Invalid message");
      } finally {
        handleMessage(message);
      }
    });

    sendSocketMessage(ws, `Hi there, I am a WebSocket server`);
  });
};
