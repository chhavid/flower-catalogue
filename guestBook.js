const fs = require('fs');

const getDate = () => {
  const date = new Date().toString();
  const index = date.indexOf('GMT');
  return date.slice(0, index);
};

const getFileContent = (filename) => {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
};

class GuestBook {
  #comments;
  #filename;
  constructor(filename) {
    this.#filename = filename;
    this.#comments = [];
  }

  add(name, comment) {
    const date = getDate();
    const comments = { date, name, comment }
    this.#comments.push(comments);
  }

  retrieveComments() {
    this.#comments.push(...getFileContent(this.#filename));
  }

  saveComments() {
    fs.writeFileSync(this.#filename, JSON.stringify(this.#comments), 'utf8');
  }

  #formatComment(comment) {
    const formattedComment = `${comment.date} ${comment.name}: ${comment.comment}<br/>`;
    return formattedComment.replaceAll('+', ' ');
  }

  allComments() {
    let comments = '';
    this.#comments.forEach((comment) => {
      comments += this.#formatComment(comment);
    });
    return comments;
  }
}

module.exports = { GuestBook };
