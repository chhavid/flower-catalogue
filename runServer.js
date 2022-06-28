const { startServer } = require('./src/server/server.js');
const { handleRequest, addGuestBook } = require('./src/handlers/handler.js');
const { serveFileContent, notFound } = require('./src/handlers/serveFileContent.js');
const { createHandler } = require('./src/server/router.js');

const commentsFile = './public/data/comments.json';
const guestBookTemplate = './public/data/guestbook.html'

const handlers = [addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

startServer(1234, createHandler(handlers));