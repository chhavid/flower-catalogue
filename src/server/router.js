const matches = function (method, path) {
  return this.method === method && this.url.pathname === path;
};

const createHandler = (handlers) => {
  return (request, response) => {
    console.log(request.method, request.url);
    request.url = new URL(request.url, `http://${request.headers.host}`);
    request.matches = matches.bind(request);

    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  }
};

module.exports = { createHandler };
