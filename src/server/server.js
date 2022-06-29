const http = require('http');

const startServer = (port, handlers) => {
  const server = http.createServer(handlers);
  server.listen(port, () => {
    console.log('starting listening on', port);
  });
};

module.exports = { startServer };
