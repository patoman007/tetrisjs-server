const utils = require('../utils/utils');
const Client = require('./Client');

function newClient(connection, clientId = utils.getRandomId()) {
  return new Client(connection, clientId);
}

module.exports = {
  newClient
};
