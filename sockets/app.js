const WebSocket = require("ws");
const { sendSocketMessage, broadcastMessage } = require("./messages/transport");
const { commands } = require("./messages/commands");
const { responses } = require('./messages/responses');
const { parser } = require("./messages/parser");

// Here's the new idea: add `messagesTypes` constant as a "dictionary", always pass the user state, 
// always receive the new user state. It's impure FP, but I think that gets us to where we want to be.

exports.socketsApp = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, request) => {
    let commandResult, response, state = { loggedIn: false, username: '' };

    // can use request.url to create different rooms?
    // console.log(request);

    // `message` in this block is overloaded, should clarify.
    ws.on("message", (raw) => {
      let message;
      try {
        console.log("received: %s", raw);
        message = parser(raw);
        // TODO: either need to handle invalid messages here or have messageParser raise them
      } catch {
        console.log("Invalid message");
        sendSocketMessage(ws, responses.get('invalid command').message);
        // can use this to remove people who do not agree to the TOS
        // ws.terminate();
      } finally {
        if (message && commands.has(message.command)) {
          commandResult = commands.get(message.command)({message: message.message, state: state});
          // destructuring isn't working right now for some reason
          response = commandResult.response;
          state = commandResult.state;
        } else {
          response = responses.get('invalid command');
        }

        if(response.sendTo === 'self') {
          sendSocketMessage(ws, response().message);
        } else {
          broadcastMessage(wss, response().message, state.username);
        }
      }
    });

    sendSocketMessage(ws, `Campsite connected.`);
  });
};
