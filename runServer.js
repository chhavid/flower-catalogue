const { startServer, createHandler } = require('./server.js');
const { serveFileContent, handleRequest, notFound, addGuestBook } = require('./handler.js');

const handlers = [addGuestBook('./public/comments.json'), serveFileContent, handleRequest, notFound];

startServer(1234, createHandler(handlers));