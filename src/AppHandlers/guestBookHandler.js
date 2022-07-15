const fs = require('fs');
const { GuestBook } = require('./guestBook');

const getContent = (file) => {
  return fs.readFileSync(file, 'utf8');
};

const addGuestBook = (commentsFile, template) => {
  const comments = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));
  const guestBook = new GuestBook(comments);
  return (request, response, next) => {
    request.guestBook = guestBook;
    request.commentsFile = commentsFile;
    request.template = template;
    next();
  };
};

const apiHandler = (request, response) => {
  const { guestBook } = request;
  response.end(JSON.stringify(guestBook.comments));
  return true;
};

const write = (file, content) =>
  fs.writeFileSync(file, content, 'utf8');

const persistComments = (guestBook, file) => {
  const allComments = JSON.stringify(guestBook.comments);
  write(file, allComments);
};

const commentsHandler = (request, response) => {
  const { guestBook, body, session, commentsFile } = request;
  const { comment } = body;
  guestBook.add(session.name, comment);
  persistComments(guestBook, commentsFile);
  response.end('');
};

const guestBookHandler = ({ guestBook, session, template }, response) => {
  const content = getContent(template);
  const name = session.name;
  response.end(guestBook.createPage(name, content));
  return true;
};

const handleRequest = (request, response) => {

  if (!request.session) {
    return response.redirect('/login.html');
  }
  return guestBookHandler(request, response);
};

module.exports = { handleRequest, addGuestBook, apiHandler, commentsHandler };
