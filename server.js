const { createServer } = require('net');
const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const onConnection = (socket, handler, path) => {
  socket.on('error', (err) => { console.log(err); });
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    console.log(request.method, request.uri);
    handler(request, response, path);
  });
};

const startServer = (port, handlers, path) => {
  const server = createServer((socket) => {
    onConnection(socket, handlers, path);
  });
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

module.exports = { startServer, onConnection };
