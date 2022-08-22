const status200 = (res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const status201 = (res, data) => {
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const error400 = (res, error) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(error.message);
  console.log(error)
};

const error404 = (res, error) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(error.message);
  console.log(error);
};

const serverError = (res, err) => {
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.end(`Server side error. Error: ${err.message}`);
};

const pageNotFound = (res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end('Page not found');
};

export {
  status200,
  status201,
  error400,
  error404,
  serverError,
  pageNotFound
};