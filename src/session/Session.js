class Session {

  constructor(id) {
    this.id = id;
    this.clients = new Set();
  }

  add(client) {
    if (client.session == this) {
      throw new Error('Client is already in session');
    }

    client.session = this;
    this.clients.add(client);
  }

  remove(client) {
    if (!this.clients.has(client)) { return; }

    client.session = null;
    this.clients.delete(client);
  }

}

module.exports = Session;
