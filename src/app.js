const { handleRequest, addGuestBook } = require('./handlers/handler.js');
const { serveFileContent, notFound } = require('./handlers/serveFileContent.js');

const commentsFile = './public/data/comments.json';
const guestBookTemplate = './public/data/guestbook.html'
const handlers = [addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

module.exports = { handlers };
