const express = require('express');
const { handleRequest, addGuestBook, apiHandler, commentsHandler } =
  require('./AppHandlers/guestBookHandler.js');
const { injectCookie } = require('./AppHandlers/cookieHandler.js');
const { injectSession } = require('./AppHandlers/injectSession.js');
const { signUp } = require('./AppHandlers/signUpHandler.js');
const { logoutHandler, loginHandler } = require('./AppHandlers/loginHandler.js');

const createApp = ({ log, dir, template, commentsFile }, sessions, users) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(addGuestBook(commentsFile, template));
  app.use(injectCookie, injectSession(sessions));
  app.get('/api', apiHandler);
  app.get('/guestbook', handleRequest);
  app.post('/register', signUp(users));
  app.post('/login', loginHandler(sessions, users));
  app.post('/comment', commentsHandler);
  app.get('/logout', logoutHandler(sessions));
  app.use(log, express.static(dir));
  return app;
};

module.exports = { createApp };
