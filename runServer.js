const { startServer, createHandler } = require('./server.js');
const { serveFileContent, handleRequest, notFound, addGuestBook } = require('./handler.js');

const commentsFile = './public/comments.json';
const guestBookTemplate = './public/guestbook.html'

const handlers = [addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

startServer(1234, createHandler(handlers));