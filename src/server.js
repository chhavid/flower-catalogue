const http = require('http');

const startServer = (port, handlers) => {
  const server = http.createServer(handlers);
  server.listen(port);
};

module.exports = { startServer };
