import http from 'http';
import { getUsers, getUser, setUser } from './controllers/Controller.js';

const PORT = 3000 || process.env.PORT;

const idParse = /\/api\/users\/([0-9]+)/;

const server = http.createServer((req, res) => {

  if (req.url === '/api/users' && req.method === 'GET') {

    getUsers(req, res);

  } else if (req.url.match(idParse) && req.method === 'GET') {

    const id = req.url.split('/')[3];

    getUser(req, res, id);

  } else if (req.url === '/api/users' && req.method === 'POST') {

    setUser(req, res);
  } else {

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Page not found' }));

  };
});

server.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});