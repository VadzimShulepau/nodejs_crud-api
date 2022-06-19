import http from 'http';
import { getUsers, getUser, setUser, changeUser, deleteUser } from './Controller.js';
import { pageNotFound, serverError } from './Error.js';
import 'dotenv/config';

console.log('PORT: '+ process.env.PORT)
const PORT = 3000 || process.env.PORT;

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
      serverError(res);
      break;
  };

});

server.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
