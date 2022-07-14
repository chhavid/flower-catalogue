const { startServer } = require('myServer');
const { app } = require('./src/app.js');
const { Sessions } = require('./src/AppHandlers/sessions.js');

const logRequest = ({ method, url }, res, next) => {
  console.log(method, url.pathname);
  next();
};

const config = {
  dirPath: './public',
  log: logRequest
};

const sessions = new Sessions();

startServer(1234, app(config, sessions, {}));
