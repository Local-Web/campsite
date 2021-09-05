const WebSocket = require("ws");

function broadcastMessage(wss, message) {
  wss.clients.forEach((client) => client.send(message));
}

// Super stripped-down version of the app server: no-auth echo.
exports.socketsApp = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (raw) => {
      broadcastMessage(wss, raw);
    });

    ws.send(`Campsite connected.`);
    broadcastMessage(wss, `A new person has entered`);
  });
};
