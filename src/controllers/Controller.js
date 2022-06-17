import { findUsers, findUserById, create } from "../models/Model.js";

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

    if (!user) {
      //if invalid code 400
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));

    } else {

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));

    }

  } catch (error) {
    console.log(error);
  }

};

const setUser = async (req, res) => {
  try {
    
    let body = '';

    req.on('data', data => {
      body += data.toString();
    });

    req.on('end', async () => {

      const newUser = await create(JSON.parse(body));

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });

  } catch (error) {

    console.log(error);

  };
};

export {
  getUsers,
  getUser,
  setUser
};