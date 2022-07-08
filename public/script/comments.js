const addHtml = (allComments) => {
  const textArea = document.querySelector('#comment');
  textArea.value = '';

  const comments = document.querySelector('.comments');
  comments.innerHTML = allComments;
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
    addHtml(xhr.responseText)
  };
  xhr.open('POST', '/comment');
  xhr.send(body);
};
