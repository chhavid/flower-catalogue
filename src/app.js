const { handleRequest, addGuestBook } = require('./AppHandlers/handler.js');
const { serveFileContent, notFound } = require('./AppHandlers/serveFileHandler.js');

const validateMethod = (request, response) => {
  if (request.method !== 'GET') {
    response.statusCode = 405;
    response.end('Invalid method');
    return true
  }
  return false;
};

const commentsFile = './src/data/comments.json';
const guestBookTemplate = './src/data/guestbook.html'
const handlers = [validateMethod, addGuestBook(commentsFile, guestBookTemplate), handleRequest, serveFileContent, notFound];

module.exports = { handlers };
