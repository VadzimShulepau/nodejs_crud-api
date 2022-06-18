import http from 'http';
import { getUsers, getUser, setUser, changeUser, deleteUser } from './Controller.js';
import { pageNotFound } from './Error.js';

const PORT = 3000 || process.env.PORT;

const idParse = /\/api\/users\/([0-9]+)/;

export const server = http.createServer((req, res) => {

  switch (req.method) {
    case 'GET':
      if (req.url === '/api/users') {

        getUsers(req, res);

      } else if (req.url.match(idParse)) {

        const userId = req.url.split('/')[3];

        getUser(req, res, userId);

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
      if (req.url.match(idParse)) {

        const userId = req.url.split('/')[3];

        changeUser(req, res, userId);

      } else {
        pageNotFound(res);
      };
      break;

    case 'DELETE':
      if (req.url.match(idParse)) {

        const userId = req.url.split('/')[3];

        deleteUser(req, res, userId);

      } else {
        pageNotFound(res);
      }
      break;
    default:
      pageNotFound(res);
      break;
  };

});

server.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
