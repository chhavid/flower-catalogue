const createSession = (req, sessions) => {
  const { name } = req.body;
  const time = new Date().getTime();
  const id = time.toLocaleString();

  const session = { name, id, time };
  sessions.add(session);
  return id;
};

const isPassCorrect = (users, name, password) =>
  users[name].password === password;

const areCredentialsValid = (users, req) => {
  const { name, password } = req.body;
  return users[name] && isPassCorrect(users, name, password);
};

const loginHandler = (sessions, users) => (req, res) => {
  if (!areCredentialsValid(users, req)) {
    return res.redirect('/login.html');
  }

  const id = createSession(req, sessions);
  res.set('set-cookie', `id=${id}`);
  // res.cookie('id', id);
  return res.redirect('/guestbook');
};

const logoutHandler = (sessions) =>
  (req, res) => {
    sessions.remove(req.cookies.id);
    // res.clearCookie('id');
    res.set('set-cookie', 'id=0;max-age=0');
    return res.redirect('/');
  };

module.exports = { logoutHandler, loginHandler };
