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

const makeXhrRequest = (cb, method, path, body = '') => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status == 200) {
      cb(xhr);
      return;
    }
    console.log('Error in fetching', method, path);
  }
  xhr.open(method, path);
  xhr.send(body);
};

const get = (url, cb) => makeXhrRequest(cb, 'GET', url);

const post = (url, body, cb) => makeXhrRequest(cb, 'POST', url, body);

const getComments = () => {
  const cb = (xhr) => {
    addHtml(JSON.parse(xhr.responseText))
  };
  get('/api', cb);
};

const addComment = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);
  const cb = getComments;
  post('/comment', body, cb);
};
