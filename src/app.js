const { bodyParser } = require('./AppHandlers/bodyParser.js');
const { handleRequest, addGuestBook, apiHandler, commentsHandler } =
  require('./AppHandlers/guestBookHandler.js');
const { serveFileContent, notFound } = require('myServer');
const { injectCookie } = require('./AppHandlers/cookieHandler.js');
const { injectSession } = require('./AppHandlers/injectSession.js');
const { signUp } = require('./AppHandlers/signUpHandler.js');
const { createRouter } = require('./server/router.js');
const { logoutHandler, loginHandler } = require('./AppHandlers/loginHandler.js');

const app = ({ log, dirPath = './public' }, sessions = {}, users = {}) => {
  const commentsFile = './data/comments.json';
  const guestBookTemplate = './template/guestbook.html'
  const handlers = [
    log,
    bodyParser,
    addGuestBook(commentsFile, guestBookTemplate),
    injectCookie,
    injectSession(sessions),
    signUp(users),
    loginHandler(sessions, users),
    logoutHandler(sessions),
    apiHandler,
    commentsHandler,
    handleRequest,
    serveFileContent(dirPath),
    notFound];

  return createRouter(handlers);
};

module.exports = { app };
