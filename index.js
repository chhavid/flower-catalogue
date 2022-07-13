const { startServer } = require('myServer');
const { app } = require('./src/app.js');

startServer(1234, app('./public', {}, {}));
