const fs = require('fs');
const { GuestBook } = require('./guestBook');

const addGuestBook = (commentsFile, template) => {
  const comments = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));
  const guestBook = new GuestBook(comments, template);
  return (request, response, next) => {
    request.guestBook = guestBook;
    request.commentsFile = commentsFile;
    next();
  };
};

const apiHandler = (request, response, next) => {
  const { guestBook } = request;
  if (request.matches('GET', '/api')) {
    response.end(JSON.stringify(guestBook.comments));
    return true;
  }
  next();
};

const write = (file, content) =>
  fs.writeFileSync(file, content, 'utf8');

const redirectPage = (response, uri) => {
  response.statusCode = 302;
  response.setHeader('location', uri);
  response.end('');
};

const persistComments = (guestBook, file) => {
  const allComments = JSON.stringify(guestBook.comments);
  write(file, allComments);
};

const commentsHandler = (request, response, next) => {
  const { guestBook, bodyParams, session, commentsFile } = request;
  if (!request.matches('POST', '/comment')) {
    return next();
  }
  const comment = bodyParams.get('comment');
  guestBook.add(session.name, comment);
  persistComments(guestBook, commentsFile);
  response.end('');
};

const guestBookHandler = ({ guestBook, session }, response) => {
  const name = session.name;
  response.end(guestBook.createPage(name));
  return true;
};

const handleRequest = (request, response, next) => {
  if (!request.matches('GET', '/guestbook')) {
    return next();
  }
  if (!request.session) {
    return redirectPage(response, '/login.html');
  }
  return guestBookHandler(request, response);
};

module.exports = { handleRequest, addGuestBook, redirectPage, apiHandler, commentsHandler };
