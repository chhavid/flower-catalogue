const fs = require('fs');
const { GuestBook } = require('./guestBook');

const addGuestBook = (commentsFile, template) => {
  const guestBook = new GuestBook(commentsFile, template);
  guestBook.retrieveComments();
  return (request, response) => {
    request.guestBook = guestBook;
  };
};

const guestBookHandler = ({ guestBook }, response) => {
  response.send(guestBook.createPage());
  return true;
};

const commentsHandler = ({ queryParams, guestBook }, response) => {
  const { name, comment } = queryParams;
  guestBook.add(name, comment);
  guestBook.saveComments();
  response.statusCode = 302;
  response.setHeaders('location', '/guestbook');
  response.send('');
  return true;
};

const handleRequest = (request, response) => {
  let { uri } = request;
  if (uri === '/comment') {
    return commentsHandler(request, response);
  }
  if (uri === '/guestbook') {
    return guestBookHandler(request, response);
  }
  return false;
};

module.exports = { handleRequest, addGuestBook };
