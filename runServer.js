const { startServer, createHandler } = require('./src/server.js');
const { handleRequest, addGuestBook } = require('./src/handler.js');
const { serveFileContent, notFound } = require('./src/serveFileContent.js');

const commentsFile = './public/comments.json';
const guestBookTemplate = './public/guestbook.html'

const handlers = [addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

startServer(1234, createHandler(handlers));