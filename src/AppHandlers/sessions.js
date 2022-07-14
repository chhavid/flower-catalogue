class Sessions {
  #sessions;
  constructor() {
    this.#sessions = {};
  }

  add(session) {
    this.#sessions[session.id] = session;
  }

  remove(id) {
    delete this.#sessions[id];
  }

  getSession(id) {
    return this.#sessions[id];
  }

  getInfo() {
    return this.#sessions;
  }
}

module.exports = { Sessions };
