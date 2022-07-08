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

const addComment = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  const body = parseFormData(formData).join('&');

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    addHtml(JSON.parse(xhr.responseText));
  };
  xhr.open('POST', '/comment');
  xhr.send(body);
};
