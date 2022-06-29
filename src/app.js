const { handleRequest, addGuestBook } =
  require('./AppHandlers/guestBookHandler.js');
const { serveFileContent, notFound } =
  require('./AppHandlers/serveFileHandler.js');
const { validateMethod } = require('./AppHandlers/validateMethod.js');

const commentsFile = './data/comments.json';
const guestBookTemplate = './template/guestbook.html'
const handlers = [validateMethod, addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

module.exports = { handlers };
