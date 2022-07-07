const { bodyParser } = require('./AppHandlers/bodyParser.js');
const { handleRequest, addGuestBook } =
  require('./AppHandlers/guestBookHandler.js');
const { serveFileContent, notFound } = require('myServer');
const { injectCookie, addUser } = require('./AppHandlers/cookieHandler.js');
const { injectSession } = require('./AppHandlers/injectSession.js');
const { logoutHandler } = require('./AppHandlers/logoutHandler.js');

const sessions = {};
const users = {};

const commentsFile = './data/comments.json';
const guestBookTemplate = './template/guestbook.html'
const handlers = [bodyParser, addGuestBook(commentsFile, guestBookTemplate), injectCookie, injectSession(sessions), logoutHandler, addUser(sessions), handleRequest, serveFileContent, notFound];

module.exports = { handlers };
