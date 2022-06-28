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

  try {
    const content = fs.readFileSync(fileName);
    response.setHeader('content-type', determineContentType(fileName));
    response.end(content);
  } catch (error) {
    return false;
  }
  return true
};

const notFound = (request, response) => {
  response.statusCode = 404;
  response.end('file not found');
  return true;
};

module.exports = { serveFileContent, notFound };
