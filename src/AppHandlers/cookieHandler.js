const sessions = {};

const loginHandler = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname === '/login' && req.method === 'GET') {
    res.statusCode = 302;
    res.setHeader('Location', '/login.html');
    res.end('');
    return;
  }
  next();
};

const createSession = (req, res) => {
  const name = req.bodyParams.get('name');
  const time = new Date().getTime();
  const id = time.toLocaleString();

  const session = { name, id, time };
  sessions[id] = session;
  return id;
};

const addUser = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname === '/add' && req.method === 'POST') {
    const id = createSession(req, res);
    res.setHeader('set-cookie', `id=${id}`);
    res.statusCode = 302;
    res.setHeader('Location', '/')
    res.end('');
    return;
  }
  next();
};

const parseCookie = (req, res) => {
  const cookies = {};
  const cookieString = req.headers.cookie;
  if (cookieString) {
    cookieString.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookies[name] = value;
    });
  }
  return cookies;
};

const injectCookie = (req, res, next) => {
  req.cookies = parseCookie(req, res);
  next();
};

const injectSession = (request, response, next) => {
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

module.exports = { loginHandler, injectCookie, validateUser, addUser, injectSession };