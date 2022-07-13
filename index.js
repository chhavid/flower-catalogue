const { startServer } = require('myServer');
const { app } = require('./src/app.js');

const logRequest = ({ method, url }, res, next) => {
  console.log(method, url.pathname);
  next();
};

const config = {
  dirPath: './public',
  sessions: {},
  users: {},
  log: logRequest
}

startServer(1234, app(config));
