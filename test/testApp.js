const request = require('supertest');
const { createApp } = require('../src/app.js');
const { Sessions } = require('../src/AppHandlers/sessions.js');

const noOp = (req, res, next) => next();
const sessions = new Sessions();

const config = {
  dir: './public',
  log: noOp,
  template: './template/guestbook.html',
  commentsFile: './data/comments.json'
}


describe('GET /', () => {
  it('should give homepage of flower catalogue', (done) => {
    request(createApp(config, sessions, {}))
      .get('/')
      .expect('content-type', /html/)
      .expect('content-length', '761')
      .expect(/<title>Flower-catalogue<\/title>/)
      .expect(200, done)
  });
});

describe('GET /hello', () => {
  it('should give 404 for non existing file', (done) => {
    request(createApp(config, sessions, {}))
      .get('/hello')
      .expect('content-length', '144')
      .expect(/Cannot GET/)
      .expect(404, done)
  });
});

describe('GET /api', () => {
  it('should give api', (done) => {
    request(createApp(config, sessions, {}))
      .get('/api')
      .expect(/\[.*\]/)
      .expect(200, done)
  });
});

describe('GET /guestbook', () => {
  it('should give guestbook', (done) => {
    const sessions = new Sessions();
    sessions.add({ id: 'a', name: 'a' })
    request(createApp(config, sessions, {}))
      .get('/guestbook')
      .set('cookie', 'id=a')
      .expect(200, done)
  });
  it('should redirect to login page if user has not logged in', (done) => {
    request(createApp(config, sessions, {}))
      .get('/guestbook')
      .expect('location', '/login.html')
      .expect(302, done)
  });
});

describe('GET /login.html', () => {
  it('should give the login page', (done) => {
    request(createApp(config, sessions, {}))
      .get('/login.html')
      .expect('content-length', '514')
      .expect(/login/)
      .expect(200, done)
  });
});

describe('GET /signup.html', () => {
  it('should give the registeration page', (done) => {
    request(createApp(config, sessions, {}))
      .get('/signup.html')
      .expect(/register/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('should go to guestbook after login', (done) => {
    const users = { a: { name: 'a', password: 'a' } };
    request(createApp(config, sessions, users))
      .post('/login')
      .send('name=a&password=a')
      .expect('location', '/guestbook')
      .expect(302, done)
  });

  it('should ask for login again if credentials are incorrect', (done) => {
    const users = { a: { name: 'a', password: 'a' } };
    request(createApp(config, sessions, users))
      .post('/login')
      .send('name=a&password=b')
      .expect('location', '/login.html')
      .expect(302, done)
  });

  it('should should not login if user is not registered', (done) => {
    request(createApp(config, sessions, {}))
      .post('/login')
      .send('name=a&password=b')
      .expect('location', '/login.html')
      .expect(302, done)
  });
});

describe('POST /logout', () => {
  it('should go back to homepage after logout', (done) => {
    request(createApp(config, sessions, {}))
      .get('/logout')
      .expect('location', '/')
      .expect(302, done)
  });
});

describe('POST /register', () => {
  it('should go to login page after signup', (done) => {
    request(createApp(config, sessions, {}))
      .post('/register')
      .send('name=mani&password=abc')
      .expect('location', '/login.html')
      .expect(302, done)
  });
});

describe('POST /comment', () => {
  it('should post the comment', (done) => {
    const sessions = new Sessions();
    sessions.add({ id: '1', name: 'ab' })
    request(createApp(config, sessions, {}))
      .post('/comment')
      .set('cookie', 'id=1')
      .send('comment=hello')
      .expect(200, done)
  });
});
