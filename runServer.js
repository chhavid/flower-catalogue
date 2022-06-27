const { startServer, createHandler } = require('./server.js');
const { serveFileContent, handleRequest, notFound } = require('./handler.js');

const handlers = [handleRequest, serveFileContent, notFound];

startServer(1234, createHandler(handlers));