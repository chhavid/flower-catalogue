const contentTypes = {
  jpg: 'image/jpg',
  html: 'text/html',
  pdf: 'application/pdf'
};

const getExtension = (filename) => {
  const index = filename.lastIndexOf('.');
  return filename.slice(index + 1);
};

const determineContentType = (filename) => {
  return contentTypes[getExtension(filename)];
};

const serveFileContent = ({ uri }, response) => {
  if (uri === '/') {
    uri = '/index.html';
  }

  const fileName = './public' + uri;
  if (!fs.existsSync(fileName)) {
    return false;
  }

  response.setHeaders('content-type', determineContentType(fileName));
  const content = fs.readFileSync(fileName);
  response.send(content);
  return true;
};

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send('file not found');
  return true;
};

module.exports = { serveFileContent, notFound };
