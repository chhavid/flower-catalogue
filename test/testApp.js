const request = require('supertest');
const { app } = require('../src/app.js');

const noOp = (req, res, next) => next();
const config = {
  log: noOp,
}

describe('GET /', () => {
  it('should give homepage of flower catalogue', (done) => {
    request(app(config))
      .get('/')
      .expect('content-type', /html/)
      .expect('content-length', '798')
      .expect(/<title>Flower-catalogue<\/title>/)
      .expect(200, done)
  });
});

describe('GET /hello', () => {
  it('should give 404 for non existing file', (done) => {
    request(app(config))
      .get('/hello')
      .expect('content-length', '14')
      .expect('file not found')
      .expect(404, done)
  });
});

describe('GET /api', () => {
  it('should give api', (done) => {
    request(app(config))
      .get('/api')
      .expect(/\[.*\]/)
      .expect(200, done)
  });
});

describe('GET /guestbook', () => {
  it('should give guestbook', (done) => {
    const sessions = { a: { name: 'a' } };
    request(app(config, sessions))
      .get('/guestbook')
      .set('cookie', 'id=a')
      .expect(200, done)
  });
  it('should redirect to login page if user has not logged in', (done) => {
    request(app(config))
      .get('/guestbook')
      .expect('location', '/login.html')
      .expect(302, done)
  });
});

describe('GET /login.html', () => {
  it('should give the login page', (done) => {
    request(app(config))
      .get('/login.html')
      .expect('content-length', '514')
      .expect(/login/)
      .expect(200, done)
  });
});

describe('GET /signup.html', () => {
  it('should give the registeration page', (done) => {
    request(app(config))
      .get('/signup.html')
      .expect(/register/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('should go to guestbook after login', (done) => {
    const users = { a: { name: 'a', password: 'a' } };
    request(app(config, {}, users))
      .post('/login')
      .send('name=a&password=a')
      .expect('location', '/guestbook')
      .expect(302, done)
  });

  it('should ask for login again if credentials are incorrect', (done) => {
    const users = { a: { name: 'a', password: 'a' } };
    request(app(config, {}, users))
      .post('/login')
      .send('name=a&password=b')
      .expect('location', '/login.html')
      .expect(302, done)
  });

  it('should shoould not login if user is not registered', (done) => {
    request(app(config))
      .post('/login')
      .send('name=a&password=b')
      .expect('location', '/login.html')
      .expect(302, done)
  });
});

describe('POST /logout', () => {
  it('should go back to homepage after logout', (done) => {
    request(app(config))
      .get('/logout')
      .expect('location', '/')
      .expect(302, done)
  });
});

describe('POST /register', () => {
  it('should go to login page after signup', (done) => {
    request(app(config))
      .post('/register')
      .send('name=mani&password=abc')
      .expect('location', '/login.html')
      .expect(302, done)
  });
});

describe('POST /comment', () => {
  it('should post the comment', (done) => {
    const sessions = { 1: { name: 'ab', id: '1', time: '5' } };
    request(app(config, sessions))
      .post('/comment')
      .set('cookie', 'id=1')
      .send('comment=hello')
      .expect(200, done)
  });
});
