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

const guestBookHandler = (request, response, guestBook) => {
  const allComments = guestBook.allComments();
  const guestBookPage = getHtml(allComments, './public/guestbook.html');
  response.send(guestBookPage);
  return true;
};

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send('file not found');
  return true;
};

const commentsHandler = ({ queryParams }, response, guestBook) => {
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
  const fileName = './public/comments.json';
  const guestBook = new GuestBook(fileName);
  guestBook.retrieveComments();

  if (uri === '/comment') {
    return commentsHandler(request, response, guestBook);
  }
  if (uri === '/guestbook') {
    return guestBookHandler(request, response, guestBook);
  }
  return false;
};

const serveFileContent = ({ uri }, response,) => {
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

module.exports = { serveFileContent, notFound, handleRequest };
