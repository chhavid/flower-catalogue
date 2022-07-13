const { redirectPage } = require('./guestBookHandler');

const createSession = (req, sessions) => {
  const name = req.bodyParams.get('name');
  const time = new Date().getTime();
  const id = time.toLocaleString();

  const session = { name, id, time };
  sessions[id] = session;
  return id;
};

const isPassCorrect = (users, name, password) =>
  users[name].password === password;

const areCredentialsValid = (users, { bodyParams }) => {
  const name = bodyParams.get('name');
  const password = bodyParams.get('password');
  return users[name] && isPassCorrect(users, name, password);
};

const loginHandler = (sessions, users) => (req, res, next) => {
  if (!req.matches('POST', '/login')) {
    return next();
  }

  if (!areCredentialsValid(users, req)) {
    return redirectPage(res, '/login.html');
  }

  const id = createSession(req, sessions);
  res.setHeader('set-cookie', `id=${id}`);
  redirectPage(res, '/guestbook');
  return;
};

const logoutHandler = (sessions) =>
  (req, res, next) => {
    if (req.matches('POST', '/logout')) {
      delete sessions[req.cookies.id];
      res.setHeader('set-cookie', 'id=0;max-age=0');
      return redirectPage(res, '/');
    }
    next();
  };

module.exports = { logoutHandler, loginHandler };
