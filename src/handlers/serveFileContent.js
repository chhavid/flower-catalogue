const fs = require('fs');

const contentTypes = {
  jpg: 'image/jpg',
  html: 'text/html',
  pdf: 'application/pdf',
};

const getExtension = (filename) => {
  const index = filename.lastIndexOf('.');
  return filename.slice(index + 1);
};

const determineContentType = (filename) => {
  return contentTypes[getExtension(filename)];
};

const serveFileContent = ({ url }, response) => {
  const { pathname } = url;
  if (pathname === '/') {
    pathname = '/index.html';
  }
  const fileName = './public' + pathname;
  if (!fs.existsSync(fileName)) {
    return false;
  }
  response.setHeader('content-type', determineContentType(fileName) || 'text/plain');
  const content = fs.readFileSync(fileName);
  response.end(content);
  return true;
};

const notFound = (request, response) => {
  response.statusCode = 404;
  response.end('file not found');
  return true;
};

module.exports = { serveFileContent, notFound };
