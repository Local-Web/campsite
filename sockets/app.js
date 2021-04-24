const WebSocket = require("ws");
const { broadcastMessage, sendMessage } = require("./messages");

exports.socketsApp = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    let username = "";

    // Don't love this design: need to find a way of setting the state without bringing in so much of the
    // implementation here.
    const handleMessage = (envelope) => {
      if (envelope.message) {
        broadcastMessage(wss, envelope.message, username);
      } else if (envelope.join) {
        username = envelope.join;
        broadcastMessage(wss, `${username} joined the chat`);
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

    sendMessage(ws, `Hi there, I am a WebSocket server`);
  });
};
