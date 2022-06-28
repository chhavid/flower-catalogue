const { startServer } = require('./src/server/server.js');
const { createHandler } = require('./src/server/router.js');
const { handlers } = require('./src/app');

startServer(1234, createHandler(handlers));
