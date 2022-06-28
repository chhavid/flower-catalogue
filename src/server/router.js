const { URL } = require('url');

const createHandler = (handlers) => {
  return (request, response) => {
    request.url = new URL(request.url, `http://${request.rawHeaders[1]}`)
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  }
};

module.exports = { createHandler };
