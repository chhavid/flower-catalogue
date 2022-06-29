const validateMethod = (request, response) => {
  if (request.method !== 'GET') {
    response.statusCode = 405;
    response.end('Invalid method');
    return true
  }
  return false;
};

module.exports = { validateMethod };