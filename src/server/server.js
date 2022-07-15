// const http = require('http');
const express = require('express');


const startServer = (port, handlers) => {
  const app = express();
  app.listen(port, () => {
    console.log(`Started listening on ${port}`);
  })
  // const server = http.createServer(handlers);
  // server.listen(port, () => {
  //   console.log('starting listening on', port);
  // });
};

module.exports = { startServer };
