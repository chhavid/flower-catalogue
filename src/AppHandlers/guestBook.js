class GuestBook {
  #comments;
  constructor(comments, template) {
    this.#comments = comments;
  }

  add(name, comment) {
    const date = new Date().toLocaleString();
    const comments = { date, name, comment }
    this.#comments.unshift(comments);
    return comments;
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

  createPage(name, content) {
    return content.replaceAll('__COMMENTS__', this.#getCommentsList())
      .replace('__NAME__', name);
  }
}

module.exports = { GuestBook };
