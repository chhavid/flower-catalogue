const { startServer } = require('./src/server.js');
const { handleRequest, addGuestBook, createHandler } =
  require('./src/handler.js');
const { serveFileContent, notFound } = require('./src/serveFileContent.js');

const commentsFile = './public/data/comments.json';
const guestBookTemplate = './public/data/guestbook.html'

const handlers = [addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

startServer(1234, createHandler(handlers));