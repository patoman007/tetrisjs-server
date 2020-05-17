const WebSocketServer = require('ws').Server;
const clientUtils = require('./client/utils');
const handlers = require('./handlers');
const logger = require('./utils/logger');

const sessions = new Map();
const port = process.env.PORT || 9000;
const server = new WebSocketServer({ port });

server.on('connection', (connection) => {
  logger.log('Connection established.');

  const client = clientUtils.newClient(connection);

  connection.on('message', (data) => handlers.onMessageReceived(client, sessions, data));
  connection.on('close', () => handlers.onConnectionClosed(client, sessions));
});

logger.log(`Server listening on port ${port}`);
