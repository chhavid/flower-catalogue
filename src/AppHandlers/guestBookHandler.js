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

const apiHandler = ({ guestBook }, response) => {
  response.end(JSON.stringify(guestBook.comments));
  return true;
};

const write = (file, content) =>
  fs.writeFileSync(file, content, 'utf8');

const redirectPage = (response, uri) => {
  response.statusCode = 302;
  response.setHeader('location', uri);
  response.end('');
};

const addComment = ({ guestBook, bodyParams, session, commentsFile }) => {
  const name = session.name;
  const comment = bodyParams.get('comment');
  guestBook.add(name, comment);
  const allComments = JSON.stringify(guestBook.comments);
  write(commentsFile, allComments);
};

const commentsHandler = (request, response) => {
  addComment(request);
  response.end(request.guestBook.getCommentsList());
  return true;
  // const comment = addComment(request);
  // response.end(comment);
  // return true;
};

const guestBookHandler = ({ guestBook, session }, response) => {
  const name = session.name;
  response.end(guestBook.createPage(name));
  return true;
};

const handleRequest = (request, response, next) => {
  if (request.matches('POST', '/comment')) {
    return commentsHandler(request, response);
  }
  if (request.matches('GET', '/api')) {
    return apiHandler(request, response);
  }
  if (request.matches('GET', '/guestbook')) {
    if (!request.session) {
      return redirectPage(response, '/login.html');
    }
    return guestBookHandler(request, response);
  }
  next();
};

module.exports = { handleRequest, addGuestBook, redirectPage };
