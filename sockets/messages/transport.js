const { v4: uuidv4 } = require("uuid");

const prepMessage = (message, username = "") => {
  const id = uuidv4();
  return `{"message": "${message}", "id": "${id}", "username": "${username}"}`;
};

const sendSocketMessage = (ws, message, username) => {
  ws.send(prepMessage(message, username));
};

exports.sendSocketMessage = sendSocketMessage;

exports.broadcastMessage = (wss, message, username) => {
  wss.clients.forEach((client) => exports.sendSocketMessage(client, message, username));
};