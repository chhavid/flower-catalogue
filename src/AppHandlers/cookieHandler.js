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

module.exports = { injectCookie };
