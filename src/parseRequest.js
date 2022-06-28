const parseValue = (value) => {
  const parsedValue = value.replaceAll('+', ' ');
  return parsedValue.replaceAll('%0D%0A', '\r\n');
};

const parseUri = (rawUri) => {
  const queryParams = {};
  const [uri, queryString] = rawUri.split('?');
  if (!queryString) {
    return { uri, queryParams };
  }
  const params = queryString.split('&');
  params.forEach(query => {
    const [param, value] = query.split('=');
    queryParams[param] = parseValue(value);
  })
  return { uri, queryParams };
};

const parseRequestLine = (lines) => {
  const [method, rawUri, http] = lines.split(' ');
  const uri = parseUri(rawUri);
  return { method, ...uri, http };
};

const splitHeader = (header) => {
  const indexOfSeparator = header.indexOf(':');
  const key = header.slice(0, indexOfSeparator).trim();
  const value = header.slice(indexOfSeparator + 1).trim();
  return [key, value];
};

const parseHeaders = (lines) => {
  const headers = {};
  let index = 0;
  while (index < lines.length && lines[index].length > 0) {
    const [key, value] = splitHeader(lines[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};

const parseRequest = (request) => {
  const lines = request.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { headers, ...requestLine };
};

module.exports = { parseRequest, parseHeaders, splitHeader, parseRequestLine };
