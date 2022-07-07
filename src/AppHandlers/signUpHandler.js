const { redirectPage } = require('./guestBookHandler');

const signUp = (users) => (req, res, next) => {
  if (req.matches('POST', '/register')) {
    const name = req.bodyParams.get('name');
    const password = req.bodyParams.get('password');
    users[name] = { name, password };
    return redirectPage(res, '/login.html');
  }
  next();
};

module.exports = { signUp };
