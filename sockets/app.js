const WebSocket = require("ws");
const { broadcastMessage, sendSocketMessage } = require("./messages");
const messageTypes = require("./messageTypes");

// Here's the new idea: add `messagesTypes` constant as a "dictionary", add a `type` field to the incoming 
// messages, always pass the user state, always receive the new user state. It's impure FP, but I think that
// gets us to where we want to be.

exports.socketsApp = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    let userState = { username: '' };

    // Don't love this design: need to find a way of setting the state without bringing in so much of the
    // implementation here.
    const handleMessage = (envelope) => {
      if (envelope.message) {
        broadcastMessage(wss, envelope.message, userState.username);
      } else if (envelope.join) {
        userState.username = envelope.join;
        broadcastMessage(wss, `${userState.username} joined the chat`);
      }
    }

    ws.on("message", (raw) => {
      let envelope = {};
      try {
        console.log("received: %s", raw);
        envelope = JSON.parse(raw);
      } catch {
        console.log("Invalid JSON");
      } finally {
        handleMessage(envelope);
      }
    });

    sendSocketMessage(ws, `Hi there, I am a WebSocket server`);
  });
};
