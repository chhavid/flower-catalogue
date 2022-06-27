const { startServer } = require('./server.js');
const { serveFileContent } = require('./handler.js');


startServer(1234, serveFileContent);