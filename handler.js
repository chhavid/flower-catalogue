const fs = require('fs');

const contentTypes = {
  jpg: 'image/jpg',
  html: 'text/html'
};

const getExtension = (filename) => {
  const index = filename.lastIndexOf('.');
  return filename.slice(index + 1);
};

const serveFileContent = ({ uri }, response, path = './public') => {
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

module.exports = { serveFileContent };

