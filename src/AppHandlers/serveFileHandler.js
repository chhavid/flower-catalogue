const fs = require('fs');
const mime = require('mime-types');

const serveFileContent = ({ url }, response) => {
  const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
  const fileName = './public' + pathname;

  try {
    const content = fs.readFileSync(fileName);
    response.setHeader('content-type', mime.lookup(fileName));
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
