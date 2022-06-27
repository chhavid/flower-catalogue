const fs = require('fs');
const { commentsHandler, getAllComments } = require('./commentHandler');

const contentTypes = {
  jpg: 'image/jpg',
  html: 'text/html',
  pdf: 'application/pdf'
};

const getExtension = (filename) => {
  const index = filename.lastIndexOf('.');
  return filename.slice(index + 1);
};

const guestBookHandler = (request, response) => {
  const filename = './public/comments.json';
  const comments = getAllComments(filename);
  let guestBook = fs.readFileSync('./public/guestbook.html', 'utf8');
  guestBook = guestBook.replace('COMMENTS', comments);
  response.send(guestBook);
  return true;
};

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send('file not found');
  return true;
};

const handleRequest = (request, response) => {
  let { uri } = request;
  if (uri === '/comment') {
    return commentsHandler(request, response);
  }
  if (uri === '/guestbook.html') {
    return guestBookHandler(request, response);
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
