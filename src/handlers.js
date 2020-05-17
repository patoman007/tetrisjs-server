const MESSAGES = require('./messages/messages');

const sessionUtils = require('./session/utils');
const messageUtils = require('./messages/utils');

const logger = require('./utils/logger');

function onClientJoined(client, sessions, data) {
  const { sessionId, playerName } = data;
  const session = sessions.get(sessionId) || sessionUtils.newSession(sessionId);

  client.setPlayerName(playerName);
  session.add(client);
  sessions.set(session.id, session);

  logger.log(`Client ${client.id} joined to session ${sessionId} with name ${playerName}`);

  messageUtils.broadcastClientHasJoinedMessage(client);
  messageUtils.sendSessionInformationMessage(client, session);
}

function onCreateSession(client, sessions, data) {
  const { playerName } = data;
  const session = sessionUtils.newSession();

  client.setPlayerName(playerName);
  session.add(client);
  sessions.set(session.id, session);

  logger.log(`Session with id ${session.id} was created.`);

  messageUtils.sendSessionCreatedMessage(client, session);
}

function onStateUpdated(client, data) {
  client.broadcast(data);
}

function onConnectionClosed(client, sessions) {
  logger.log(`Client ${client.id} has closed the connection.`);

  const { session } = client;
  if (session == null) {
    return;
  }

  messageUtils.broadcastClientHasLeftMessage(client);
  session.remove(client);

  if (session.clients.size === 0) {
    sessions.delete(session.id);
  }
}

function onMessageReceived(client, sessions, data) {
  const payload = JSON.parse(data);
  const _data = payload.data;

  // console.log('onMessageReceived', payload);

  switch (payload.type) {
    case MESSAGES.session.create: return onCreateSession(client, sessions, _data);
    case MESSAGES.client.joined: return onClientJoined(client, sessions, _data);
    case MESSAGES.state.update: return onStateUpdated(client, payload);
    default: return null;
  }
}

module.exports = {
  onConnectionClosed,
  onMessageReceived
};
