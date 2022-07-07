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

const addUser = (sessions, users) => (req, res, next) => {
  if (!req.matches('POST', '/add')) {
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

const parseCookie = (cookieString) => {
  const cookies = {};
  if (cookieString) {
    cookieString.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookies[name] = value;
    });
  }
  return cookies;
};

const injectCookie = (req, res, next) => {
  req.cookies = parseCookie(req.headers.cookie);
  next();
};

module.exports = { injectCookie, addUser };
