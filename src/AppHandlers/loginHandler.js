const loginHandler = (req, res, next) => {
  if (req.matches('GET', '/login')) {
    res.statusCode = 302;
    res.setHeader('location', '/login.html');
    res.end('');
    return;
  }
  next();
};

const logoutHandler = (req, res, next) => {
  if (req.matches('GET', '/logout')) {
    res.setHeader('set-cookie', 'id=0;max-age=0');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end('');
    return;
  }
  next();
};

module.exports = { loginHandler, logoutHandler };
