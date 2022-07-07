const loginHandler = (req, res, next) => {
  if (req.matches('GET', '/login')) {
    res.statusCode = 302;
    res.setHeader('location', '/guestbook');
    res.end('');
    return;
  }
  next();
};

const logoutHandler = (req, res, next) => {
  if (req.matches('GET', '/logout')) {
    const id = req.session.id;
    res.setHeader('set-cookie', 'id=0;max-age=0');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end('');
    return;
  }
  next();

};

const createSession = (req, sessions) => {
  const name = req.bodyParams.get('name');
  const time = new Date().getTime();
  const id = time.toLocaleString();

  const session = { name, id, time };
  sessions[id] = session;
  return id;
};

const addUser = (sessions) => (req, res, next) => {
  if (req.matches('POST', '/add')) {
    const id = createSession(req, sessions);
    res.setHeader('set-cookie', `id=${id}`);
    res.statusCode = 302;
    res.setHeader('Location', '/guestbook')
    res.end('');
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

const injectSession = (sessions) => (request, response, next) => {
  const { id } = request.cookies;
  if (!id) {
    next();
    return;
  }
  request.session = sessions[id];
  next();
};

const validateUser = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname !== '/guestbook') {
    next();
    return;
  }
  if (!req.cookies.id) {
    res.statusCode = 302;
    res.setHeader('Location', '/login.html');
    res.end('');
    return;
  }
  next();
}

module.exports = { loginHandler, logoutHandler, injectCookie, validateUser, addUser, injectSession };