const { GuestBook } = require('./guestBook');
const { URL } = require('url');

const createHandler = (handlers) => {
  return (request, response) => {
    request.url = new URL(request.url, `http://${request.rawHeaders[1]}`)
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  }
};

const addGuestBook = (commentsFile, template) => {
  const guestBook = new GuestBook(commentsFile, template);
  guestBook.retrieveComments();
  return (request, response) => {
    request.guestBook = guestBook;
  };
};

const redirectPage = (response, uri) => {
  response.statusCode = 302;
  response.setHeader('location', uri);
  response.end('');
};

const commentsHandler = ({ url, guestBook }, response) => {
  const name = url.searchParams.get('name');
  const comment = url.searchParams.get('comment');
  guestBook.add(name, comment);
  guestBook.saveComments();
  redirectPage(response, '/guestbook');
  return true;
};

const guestBookHandler = ({ guestBook }, response) => {
  response.end(guestBook.createPage());
  return true;
};

const handleRequest = (request, response) => {
  let { pathname } = request.url;
  if (pathname === '/comment') {
    return commentsHandler(request, response);
  }
  if (pathname === '/guestbook') {
    return guestBookHandler(request, response);
  }
  return false;
};

module.exports = { handleRequest, addGuestBook, createHandler };
