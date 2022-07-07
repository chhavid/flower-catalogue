const { redirectPage } = require('./guestBookHandler');

const createSession = (req, sessions) => {
  const name = req.bodyParams.get('name');
  const time = new Date().getTime();
  const id = time.toLocaleString();

  const session = { name, id, time };
  sessions[id] = session;
  return id;
};

const addUser = (sessions, users) => (req, res, next) => {
  if (req.matches('POST', '/add')) {
    const name = req.bodyParams.get('name');
    const password = req.bodyParams.get('password');
    if (!users[name] || users[name].password !== password) {
      return redirectPage(res, '/register.html');
    }
    const id = createSession(req, sessions);
    res.setHeader('set-cookie', `id=${id}`);
    redirectPage(res, '/guestbook');
    return;
  }
  next();
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
