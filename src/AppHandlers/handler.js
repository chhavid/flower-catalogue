const fs = require('fs');
const { GuestBook } = require('./guestBook');

const addGuestBook = (commentsFile, template) => {
  const comments = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));
  const guestBook = new GuestBook(comments, template);
  return (request, response) => {
    request.guestBook = guestBook;
    request.commentsFile = commentsFile;
  };
};

const redirectPage = (response, uri) => {
  response.statusCode = 302;
  response.setHeader('location', uri);
  response.end('');
};

const commentsHandler = ({ url, guestBook, commentsFile }, response) => {
  const name = url.searchParams.get('name');
  const comment = url.searchParams.get('comment');
  guestBook.add(name, comment);
  const allComments = JSON.stringify(guestBook.comments);
  fs.writeFileSync(commentsFile, allComments, 'utf8');
  redirectPage(response, '/guestbook');
  return true;
};

const guestBookHandler = ({ guestBook }, response) => {
  response.end(guestBook.createPage());
  return true;
};

const handleRequest = (request, response) => {
  if (request.matches('GET', '/comment')) {
    return commentsHandler(request, response);
  }
  if (request.matches('GET', '/guestbook')) {
    return guestBookHandler(request, response);
  }
  return false;
};

module.exports = { handleRequest, addGuestBook };
