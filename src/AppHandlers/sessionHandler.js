const { redirectPage } = require('./guestBookHandler');

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
    redirectPage(res, '/guestbook');
    return;
  }
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

module.exports = { addUser, injectSession };
