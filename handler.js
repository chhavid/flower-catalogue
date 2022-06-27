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

const comments = {};

const commentsHandler = (request, response) => {
  const { queryParams } = request;
  const { name, comment } = queryParams;
  const date = getDate();
  comments[name] = {
    date, name, comment
  }
  response.statusCode = 302;
  response.setHeaders('location', 'guestbook.html');
  response.send('');
  return true;
};

const getAllComments = () => {
  let allComments = '';
  Object.keys(comments).forEach((key) => {
    const comment = comments[key];
    allComments += `${comment.date} ${comment.name}: ${comment.comment}<br/>`;
  });
  return allComments.replaceAll('+', ' ');
};

const guestBookHandler = (request, response) => {
  const comments = getAllComments();
  let guestBook = fs.readFileSync('./public/guestbook.html', 'utf8');
  guestBook = guestBook.replace('COMMENTS', comments);
  response.send(guestBook);
  return true;
};

const serveFileContent = (request, response, path = './public') => {
  let { uri } = request;
  if (uri === '/') {
    uri = '/index.html';
  }

  if (uri === '/comment') {
    commentsHandler(request, response);
  }

  if (uri === '/guestbook.html') {
    guestBookHandler(request, response);
  }

  const fileName = `${path}${uri}`;

  if (!fs.existsSync(fileName)) {
    response.send('File not found')
    return false;
  }

  const contentType = contentTypes[getExtension(fileName)] || 'text/plain';
  response.setHeaders('content-type', contentType);
  const content = fs.readFileSync(fileName);
  response.send(content);
  return true;

};

module.exports = { serveFileContent };

