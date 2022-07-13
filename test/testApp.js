const request = require('supertest');
const { app } = require('../src/app.js');

describe('GET /', () => {
  it('should give status code of 200', (done) => {
    request(app())
      .get('/')
      .expect('content-type', /html/)
      .expect(/<title>Flower-catalogue<\/title>/)
      .expect(200, done)
  });
});

describe('GET /hello', () => {
  it('should give 404 for non existing file', (done) => {
    request(app())
      .get('/hello')
      .expect('content-length', '14')
      .expect('file not found')
      .expect(404, done)
  });
});

describe('GET /api', () => {
  it('should give api', (done) => {
    request(app())
      .get('/api')
      .expect(/\[.*\]/)
      .expect(200, done)
  });
});

describe('GET /guestbook', () => {
  it('should give guestbook', (done) => {
    request(app('./public', { a: { name: 'a' } }))
      .get('/guestbook')
      .set('cookie', 'id=a')
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('should give login page', (done) => {
    const user = { a: { name: 'a', password: 'a' } };
    request(app('./public', {}, user))
      .post('/login')
      .send('name=a&password=a')
      .expect('location', '/guestbook')
      .expect(302, done)
  });
});

describe('POST /logout', () => {
  it('should give logout page', (done) => {
    request(app())
      .post('/logout')
      .expect('location', '/')
      .expect(302, done)
  });
});

describe('POST /register', () => {
  it('should give signup page', (done) => {
    request(app())
      .post('/register')
      .send('name=mani&password=abc')
      .expect('location', '/login.html')
      .expect(302, done)
  });
});
