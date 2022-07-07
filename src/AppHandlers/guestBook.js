const fs = require('fs');

const getContent = (file) => {
  return fs.readFileSync(file, 'utf8');
};

class GuestBook {
  #comments;
  #template;
  constructor(comments, template) {
    this.#template = template
    this.#comments = comments;
  }

  add(name, comment) {
    const date = new Date().toLocaleString();
    const comments = { date, name, comment }
    this.#comments.unshift(comments);
  }

  get comments() {
    return this.#comments;
  }

  #makeList({ date, name, comment }) {
    return `<li>${date} ${name}: ${comment}</li>`;
  }

  #getCommentsList() {
    let comments = '';
    this.#comments.forEach((comment) => {
      comments += this.#makeList(comment);
    });
    return comments;
  }

  createPage(name) {
    const content = getContent(this.#template);
    const guestBookPage = content.replaceAll('__COMMENTS__', this.#getCommentsList());
    return guestBookPage.replace('__NAME__', name);
    // return guestBookPage;
  }
}

module.exports = { GuestBook };
