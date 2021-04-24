const { v4: uuidv4 } = require("uuid");

const prepMessage = (message, username = "") => {
  const id = uuidv4();
  return `{"message": "${message}", "id": "${id}", "username": "${username}"}`;
};

const sendMessage = (ws, message, username) => {
  ws.send(prepMessage(message, username));
};

exports.sendMessage = sendMessage;

exports.broadcastMessage = (wss, message, username) => {
  wss.clients.forEach((client) => exports.sendMessage(client, message, username));
};