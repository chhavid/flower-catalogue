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

module.exports = { injectCookie, validateUser };