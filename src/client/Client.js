class Client {

  constructor(connection, clientId) {
    this.connection = connection;
    this.id = clientId;
    this.session = null;
    this.playerName = null;
  }

  _ack(tag, error) {
    if (error == null) {
      return;
    }

    console.error(`[${tag}] - ${error}`);
  }

  broadcast(message) {
    if (this.session == null) {
      throw new Error('Cannot broadcast without session.');
    }

    message.clientId = this.id;

    this.session.clients.forEach((client) => {
      if (this === client) {
        return;
      }

      client.send(message);
    });
  }

  getPlayerName() {
    return this.playerName;
  }

  send(message) {
    if (this.connection == null) {
      throw new Error('Cannot send message because "connection" is undefined');
    }

    // console.log('Sending message', data);

    const data = JSON.stringify(message);
    this.connection.send(data, (error) => this._ack('Client - send', error));
  }

  setPlayerName(playerName) {
    if (playerName == null) { return; }
    this.playerName = playerName;
  }

}

module.exports = Client;
