const { startServer, createHandler } = require('./server.js');
const { handleRequest, addGuestBook } = require('./handler.js');
const { serveFileContent, notFound } = require('./serveFileContent.js');

const commentsFile = './public/comments.json';
const guestBookTemplate = './public/guestbook.html'

const handlers = [addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

startServer(1234, createHandler(handlers));