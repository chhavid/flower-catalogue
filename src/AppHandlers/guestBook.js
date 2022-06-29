const fs = require('fs');

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

  createPage() {
    const guestBookPage = fs.readFileSync(this.#template, 'utf8');
    return guestBookPage.replaceAll('COMMENTS', this.#getCommentsList());
  }
}

module.exports = { GuestBook };
