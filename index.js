const { logRequest } = require('./logRequest.js');
const { createApp } = require('./src/app.js');
const { Sessions } = require('./src/AppHandlers/sessions.js');

const config = {
  dir: './public',
  log: logRequest,
  template: './template/guestbook.html',
  commentsFile: './data/comments.json'
};

const sessions = new Sessions();
const app = createApp(config, sessions, {});

app.listen(1234, () => {
  console.log('Starting listening on 1234');
});
