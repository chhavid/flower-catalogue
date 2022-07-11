const makeList = ({ date, name, comment }) => {
  return `<li>${date} ${name}: ${comment}</li>`;
};

const addHtml = (comments) => {
  const textArea = document.querySelector('#comment');
  textArea.value = '';

  const commentsElement = document.querySelector('.comments');
  let allComments = '';
  comments.forEach((comm) => {
    allComments += makeList(comm);
  });
  commentsElement.innerHTML = allComments;
};

const parseFormData = (formData) => {
  const parsedForm = [];
  for (const [field, value] of formData) {
    const paramString = field + '=' + value;
    parsedForm.push(paramString);
  }
  return parsedForm;
};

const makeXrhRequest = (cb, method, path, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    cb(xhr);
  }
  xhr.open(method, path);
  xhr.send(body);
};

const getComments = (statusCode) => {
  if (statusCode === 200) {
    const cb = (xhr) => addHtml(JSON.parse(xhr.responseText));
    makeXrhRequest(cb, 'GET', '/api');
  }
};

const addComment = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  const body = parseFormData(formData).join('&');
  const cb = (xhr) => getComments(xhr.status);
  makeXrhRequest(cb, 'POST', '/comment', body);
};

const main = () => {
  const book = document.querySelector('#book');
  book.addEventListener('click', () => getComments(200));
};

window.onload = main