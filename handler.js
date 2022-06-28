const fs = require('fs');
const { GuestBook } = require('./guestBook');

const contentTypes = {
  jpg: 'image/jpg',
  html: 'text/html',
  pdf: 'application/pdf'
};

const getExtension = (filename) => {
  const index = filename.lastIndexOf('.');
  return filename.slice(index + 1);
};

const getHtml = (comments, filename) => {
  const guestBook = fs.readFileSync(filename, 'utf8');
  return guestBook.replaceAll('COMMENTS', comments);
};

const addGuestBook = (filename) => {
  const guestBook = new GuestBook(filename);
  guestBook.retrieveComments();
  return (request, response) => {
    request.guestBook = guestBook;
  }
};

const guestBookHandler = ({ guestBook }, response) => {
  const fileName = './public/guestbook.html';
  const allComments = guestBook.allComments();
  const guestBookPage = getHtml(allComments, fileName);
  response.send(guestBookPage);
  return true;
};

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send('file not found');
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

const serveFileContent = ({ uri }, response) => {
  if (uri === '/') {
    uri = '/index.html';
  }

  const fileName = './public' + uri;
  if (!fs.existsSync(fileName)) {
    return false;
  }

  const contentType = contentTypes[getExtension(fileName)] || 'text/plain';
  response.setHeaders('content-type', contentType);
  const content = fs.readFileSync(fileName);
  response.send(content);
  return true;
};

module.exports = { serveFileContent, notFound, handleRequest, addGuestBook };
