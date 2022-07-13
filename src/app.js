const { bodyParser } = require('./AppHandlers/bodyParser.js');
const { handleRequest, addGuestBook } =
  require('./AppHandlers/guestBookHandler.js');
const { serveFileContent, notFound } = require('myServer');
const { injectCookie } = require('./AppHandlers/cookieHandler.js');
const { injectSession } = require('./AppHandlers/injectSession.js');
const { signUp } = require('./AppHandlers/signUpHandler.js');
const { logoutHandler, loginHandler } = require('./AppHandlers/loginHandler.js');
const { createRouter } = require('./server/router.js');

const app = (path, sessions = {}, users = {}) => {
  const commentsFile = './data/comments.json';
  const guestBookTemplate = './template/guestbook.html'
  const handlers = [bodyParser, addGuestBook(commentsFile, guestBookTemplate), injectCookie, injectSession(sessions), signUp(users), logoutHandler, loginHandler(sessions, users), handleRequest, serveFileContent(path), notFound];

  return createRouter(handlers);
};

module.exports = { app };
