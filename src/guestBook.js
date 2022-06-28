const fs = require('fs');

const getDate = () => {
  const date = new Date().toString();
  const index = date.indexOf('GMT');
  return date.slice(0, index);
};

class GuestBook {
  #comments;
  #commentFile;
  #template;
  constructor(commentFile, template) {
    this.#commentFile = commentFile;
    this.#template = template
    this.#comments = [];
  }

  add(name, comment) {
    const date = getDate();
    const comments = { date, name, comment }
    this.#comments.unshift(comments);
  }

  #getFileContent() {
    return JSON.parse(fs.readFileSync(this.#commentFile, 'utf8'));
  }

  retrieveComments() {
    this.#comments.push(...this.#getFileContent());
  }

  saveComments() {
    fs.writeFileSync(this.#commentFile, JSON.stringify(this.#comments), 'utf8');
  }

  #makeList(comment) {
    return `<li>${comment.date} ${comment.name}: ${comment.comment}</li>`;
  }

  #getCommentsList() {
    let comments = '';
    this.#comments.forEach((comment) => {
      comments += this.#makeList(comment);
    });
    return comments;
  }

  createPage() {
    const guestBookPage = fs.readFileSync(this.#template, 'utf8');
    return guestBookPage.replaceAll('COMMENTS', this.#getCommentsList());
  }
}

module.exports = { GuestBook };
