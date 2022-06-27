const fs = require('fs');

const getDate = () => {
  const date = new Date().toString();
  const index = date.indexOf('GMT');
  return date.slice(0, index);
};

const getFileContent = (filename) => {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
};

const getComments = (request) => {
  const { queryParams } = request;
  const { name, comment } = queryParams;
  const date = getDate();
  return { date, name, comment };
};

const commentsHandler = (request, response) => {
  const filename = './public/comments.json';
  const comments = getFileContent(filename);
  const commentName = getComments(request);

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

module.exports = { commentsHandler, getAllComments };
