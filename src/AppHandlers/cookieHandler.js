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

const addUser = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname === '/add' && req.method === 'POST') {
    res.setHeader('set-cookie', 'id=5');
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

module.exports = { loginHandler, injectCookie, validateUser, addUser };