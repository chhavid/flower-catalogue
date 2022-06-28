const { startServer, createHandler } = require('./server.js');
const { serveFileContent, handleRequest, notFound, addGuestBook } = require('./handler.js');

const handlers = [addGuestBook('./public/comments.json'), handleRequest, serveFileContent, notFound];

startServer(1234, createHandler(handlers));