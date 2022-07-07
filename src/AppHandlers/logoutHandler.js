const { redirectPage } = require('./guestBookHandler');

const registerUser = (users) => (req, res, next) => {
  if (req.matches('POST', '/register')) {
    const name = req.bodyParams.get('name');
    const password = req.bodyParams.get('password');
    users[name] = { name, password };
    return redirectPage(res, '/login.html');
  }
  next();
};

const logoutHandler = (req, res, next) => {
  if (req.matches('POST', '/logout')) {
    res.setHeader('set-cookie', 'id=0;max-age=0');
    return redirectPage(res, '/');
  }
  next();
};

module.exports = { logoutHandler, registerUser };
