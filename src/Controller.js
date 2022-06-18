import { findUsers, findUserById, create, getDataBody } from "./Model.js";

const getUsers = async (req, res) => {

  try {
    const allUsers = await findUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(allUsers));

  } catch (error) {
    console.log(error);
  }

};

const getUser = async (req, res, userId) => {

  try {

    const user = await findUserById(userId);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      //if invalid code 400
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    };

  } catch (error) {
    console.log(error);
  }

};

const setUser = async (req, res) => {
  try {
    const body = await getDataBody(req);
    const newUser = await create(JSON.parse(body));

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));

  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end({ message: error });
    console.log(error);
  };
};

const changeUser = async (req, res, userId) => {
  const user = await findUserById(userId);

};

const pageNotFound = (res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Page not found' }));
};

export {
  getUsers,
  getUser,
  setUser,
  changeUser,
  pageNotFound
};