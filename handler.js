const fs = require('fs');

const contentTypes = {
  jpg: 'image/jpg',
  html: 'text/html',
  pdf: 'application/pdf'
};

const getExtension = (filename) => {
  const index = filename.lastIndexOf('.');
  return filename.slice(index + 1);
};

const getDate = () => {
  const date = new Date().toString();
  const index = date.indexOf('GMT');
  return date.slice(0, index);
};

const getFileContent = (filename) => {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
};

const commentsHandler = (request, response) => {
  const filename = './public/comments.json';
  const comments = getFileContent(filename);
  const { queryParams } = request;
  const { name, comment } = queryParams;
  const date = getDate();
  const commentName = { date, name, comment };
  comments.push(commentName);
  fs.writeFileSync(filename, JSON.stringify(comments), 'utf8');
  response.statusCode = 302;
  response.setHeaders('location', 'guestbook.html');
  response.send('');
  return true;
};

const getAllComments = (filename) => {
  let allComments = '';
  const comments = getFileContent(filename);
  comments.forEach((comment) => {
    allComments += `${comment.date} ${comment.name}: ${comment.comment}<br/>`;
  });
  return allComments.replaceAll('+', ' ');
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

const serveFileContent = (request, response, path = './public') => {
  let { uri } = request;
  if (uri === '/') {
    uri = '/index.html';
  }

  const fileName = `${path}${uri}`;
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

