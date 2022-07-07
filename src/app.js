const { bodyParser } = require('./AppHandlers/bodyParser.js');
const { handleRequest, addGuestBook } =
  require('./AppHandlers/guestBookHandler.js');
const { serveFileContent, notFound } = require('myServer');
const { injectCookie, injectSession, validateUser, addUser } =
  require('./AppHandlers/cookieHandler.js');
const { loginHandler, logoutHandler } = require('./AppHandlers/loginHandler.js');

const sessions = {};

const commentsFile = './data/comments.json';
const guestBookTemplate = './template/guestbook.html'
const handlers = [bodyParser, addGuestBook(commentsFile, guestBookTemplate), injectCookie, injectSession(sessions), loginHandler, logoutHandler, validateUser, addUser(sessions), handleRequest, serveFileContent, notFound];

module.exports = { handlers };
