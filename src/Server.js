import http from 'http';
import { getUsers, getUser, setUser, changeUser, deleteUser } from './Controller.js';
import { pageNotFound, serverError } from './Error.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  switch (req.method) {
    case 'GET':
      if (req.url === '/api/users') {

        getUsers(req, res);

      } else if (req.url.split('/').length > 3) {

        getUser(req, res);

      } else {
        pageNotFound(res);
      };
      break;

    case 'POST':
      if (req.url === '/api/users') {
        setUser(req, res);
      } else {
        pageNotFound(res);
      };
      break;

    case 'PUT':
      if (req.url) {
        changeUser(req, res);
      } else {
        pageNotFound(res);
      };
      break;

    case 'DELETE':
      if (req.url) {
        deleteUser(req, res);

      } else {
        pageNotFound(res);
      };
      break;
    default:
      try {
        res, req, res;
      } catch (error) {
        serverError(res, error);
      }
      break;
  };

});

server.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
  process.on('SIGINT', () => {
    process.exit();
  });
});
