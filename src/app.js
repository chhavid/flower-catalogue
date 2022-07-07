const { bodyParser } = require('./AppHandlers/bodyParser.js');
const { handleRequest, addGuestBook } =
  require('./AppHandlers/guestBookHandler.js');
const { serveFileContent, notFound } = require('myServer');
const { loginHandler, injectCookie, injectSession, validateUser, addUser } =
  require('./AppHandlers/cookieHandler.js');

const commentsFile = './data/comments.json';
const guestBookTemplate = './template/guestbook.html'
const handlers = [bodyParser, addGuestBook(commentsFile, guestBookTemplate), injectCookie, injectSession, loginHandler, validateUser, addUser, handleRequest, serveFileContent, notFound];

module.exports = { handlers };
