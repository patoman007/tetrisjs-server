const utils = require('../utils/utils');
const Session = require('./Session');

function newSession(sessionId = utils.getRandomId()) {
  return new Session(sessionId);
}

module.exports = {
  newSession
};
