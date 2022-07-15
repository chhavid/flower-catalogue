const signUp = (users) => (req, res) => {
  const { name, password } = req.body;
  users[name] = { name, password };
  return res.redirect('/login.html');
};

module.exports = { signUp };
