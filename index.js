const { startServer } = require('myServer');
const { app } = require('./src/app.js');

const logRequest = ({ method, url }, res, next) => {
  console.log(method, url.pathname);
  next();
};

startServer(1234, app(logRequest, './public', {}, {}));
