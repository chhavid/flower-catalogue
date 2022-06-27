const EOL = '\r\n';

const errors = {
  200: 'ok',
  404: 'not found',
  302: 'Moved temporarily'
};

class Response {
  #socket;
  #statusCode;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  setHeaders(key, value) {
    this.#headers[key] = value;
  }

  getHeaders() {
    Object.entries(this.#headers).forEach(([key, value]) => {
      this.#socket.write(`${key}: ${value}${EOL}`);
    });
  }

  send(content) {
    const errorMessage = errors[this.#statusCode];
    const message = `HTTP/1.1 ${this.#statusCode} ${errorMessage} ${EOL}`;
    this.setHeaders('content-length', content.length);
    this.#socket.write(message);
    this.getHeaders();
    this.#socket.write(EOL);
    this.#socket.write(content);
    this.#socket.end();
  }
}

module.exports = { Response };
