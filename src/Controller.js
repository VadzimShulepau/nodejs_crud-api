import { validate } from "uuid";
import { error400, error404, status200, status201 } from "./Error.js";
import { findUsers, findUserById, create, getDataBody, change, deleteUserById, deleteData } from "./Model.js";

const getUsers = async (req, res) => {

  try {
    const allUsers = await findUsers();

    status200(res, allUsers);

  } catch (error) {
    error404(res, error);
  };

};

const getUser = async (req, res) => {
  try {
    const userId = await getID(req);
    validateUserId(res, userId);

    const user = await findUserById(userId);

    status200(res, user);

  } catch (error) {
    console.log(error);
  };
};

const setUser = async (req, res) => {
  try {
    const body = await getDataBody(req);
    const newUser = await create(JSON.parse(body));

    status201(res, newUser);

  } catch (error) {
    error400(res, error);
  };
};

const changeUser = async (req, res) => {
  try {
    const userId = await getID(req);
    validateUserId(res, userId);

    const user = await findUserById(userId);

    const body = await getDataBody(req);
    const userBody = JSON.parse(body);
    const changedData = await change(userBody, user);

    status200(res, changedData);

  } catch (error) {
    console.log(error);
  }

};

const deleteUser = async (req, res) => {
  try {
    const userId = await getID(req);

    if (validateUserId(res, userId)) {
      const getNewData = await deleteUserById(userId);
      status200(res, getNewData);
    };
  } catch (error) {
    console.log(error);
  };

};

const getID = (req) => {
  const userId = req.url.split('/')[3];
  return userId;
};

const validateUserId = async (res, userId) => {
  try {
    if (!validate(userId)) {
      error400(res, { message: 'Unimportant ID.' });
      return false;
    };

    const user = await findUserById(userId);

  } catch (error) {
    error404(res, error);
  };
};

const clearData = (data) => {
  deleteData(data);
};

export {
  getUsers,
  getUser,
  setUser,
  changeUser,
  deleteUser,
  clearData
};