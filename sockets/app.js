const WebSocket = require("ws");
const { sendSocketMessage, broadcastMessage } = require("./messages/transport");

// Super stripped-down version of the app server: no-auth echo. 
// Could provide this as an alternate file on a switch if this ends up being longer-term.
exports.socketsApp = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (raw) => {
      broadcastMessage(wss, raw, '');
    });

    sendSocketMessage(ws, `Campsite connected.`);
  });
};
