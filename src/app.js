const { handleRequest, addGuestBook } = require('./AppHandlers/handler.js');
const { serveFileContent, notFound } = require('./AppHandlers/serveFileHandler.js');

const commentsFile = './src/data/comments.json';
const guestBookTemplate = './src/data/guestbook.html'
const handlers = [addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

module.exports = { handlers };
