const fs = require('fs');
const path = require('path');

const contentTypes = {
  '.jpg': 'image/jpg',
  '.html': 'text/html',
  '.pdf': 'application/pdf',
};

const determineContentType = (filename) => {
  return contentTypes[path.extname(filename)] || 'text/plain';
};

const serveFileContent = ({ url }, response) => {
  const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
  const fileName = path.join('./public', pathname);

  if (!fs.existsSync(fileName)) {
    return false;
  }
  response.setHeader('content-type', determineContentType(fileName));
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
