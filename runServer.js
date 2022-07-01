const { startServer } = require('myServer');
const { createRouter } = require('./src/server/router.js');
const { handlers } = require('./src/app');

startServer(1234, createRouter(handlers));
