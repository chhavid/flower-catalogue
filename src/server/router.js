const matches = function (method, path) {
  return this.method === method && this.url.pathname === path;
};

const createNext = handlers => {
  let index = -1;
  const callNextHandler = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, () => callNextHandler(req, res));
    }
  };
  return callNextHandler;
};

const createRouter = (handlers) => {
  return (request, response) => {
    request.url = new URL(request.url, `http://${request.headers.host}`);
    request.matches = matches.bind(request);
    const next = createNext(handlers);
    next(request, response);
  };
};

module.exports = { createRouter };
