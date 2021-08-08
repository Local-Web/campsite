const prepMessage = (message, username = "") => {
  if (username && username !== "") {
    return `${username}: ${message}`;
  }

  return `${message}`;
};

const sendSocketMessage = (ws, message) => {
  ws.send(prepMessage(message));
};

exports.sendSocketMessage = sendSocketMessage;

exports.broadcastMessage = (wss, message, username) => {
  wss.clients.forEach((client) => exports.sendSocketMessage(client, message, username));
};