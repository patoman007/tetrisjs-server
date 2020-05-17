const MESSAGES = require('./messages');

function newMessage(type, data) {
  return { type, data };
}

function getClientData(client) {
  return {
    id: client.id,
    name: client.getPlayerName()
  };
}

function getClientMessageData(client) {
  const clientData = getClientData(client);
  return {
    client: clientData
  };
}

function getClientHasJoinedMessage(client) {
  const data = getClientMessageData(client);
  return newMessage(MESSAGES.client.joined, data);
}

function getClientHasLeftMessage(client) {
  const data = getClientMessageData(client);
  return newMessage(MESSAGES.client.left, data);
}

function getSessionCreatedMessage(message) {
  return newMessage(MESSAGES.session.created, message);
}

function getSessionInformationMessage(you, clients) {
  const data = {
    peers: {
      you,
      clients: clients.map(getClientData)
    }
  };

  return newMessage(MESSAGES.session.info, data);
}

function sendSessionCreatedMessage(client, session) {
  const message = getSessionCreatedMessage(session.id);
  client.send(message);
}

function sendSessionInformationMessage(client, session) {
  const clients = [...session.clients];

  const message = getSessionInformationMessage(client.id, clients);
  client.send(message);
}

function broadcastClientHasJoinedMessage(client) {
  const message = getClientHasJoinedMessage(client);
  client.broadcast(message);
}

function broadcastClientHasLeftMessage(client) {
  const message = getClientHasLeftMessage(client);
  client.broadcast(message);
}

module.exports = {
  sendSessionCreatedMessage,
  sendSessionInformationMessage,
  broadcastClientHasJoinedMessage,
  broadcastClientHasLeftMessage
};
