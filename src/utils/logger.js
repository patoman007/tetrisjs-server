const FileManager = require('./FileManager');

const filepath = 'server.log';
const options = {
  encoding: 'utf8',
  flag: 'as'
};

class Logger {

  constructor() {
    this.productionMode = process.env.PRODUCTION || true;
    if (this.productionMode) {
      this.fileManager = new FileManager(filepath);
    }
  }

  _getFormattedMessage(message, ...optionalParams) {
    const timestamp = new Date().toLocaleTimeString();
    const params = [...optionalParams]
        .reduce((result, param) => `${result}\n${param}`, '');

    return `${timestamp}\t${message}\t${params}\r\n`;
  }

  _persistMessage(formattedMessage) {
    this.fileManager.writeToFile(formattedMessage, options);
  }

  log(message, ...optionalParams) {
    if (this.productionMode) {
      const _message = this._getFormattedMessage(message, ...optionalParams);
      this._persistMessage(_message);
    }

    console.log(message, ...optionalParams);
  }

}

const logger = new Logger();

module.exports = logger;
