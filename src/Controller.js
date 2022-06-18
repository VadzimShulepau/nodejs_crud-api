import { error400, error404, status200, status201 } from "./Error.js";
import { findUsers, findUserById, create, getDataBody, change, deleteUserById } from "./Model.js";

const getUsers = async (req, res) => {

  try {
    const allUsers = await findUsers();

    status200(res, allUsers);

  } catch (error) {
    error404(res, error);
  };

};

const getUser = async (req, res, userId) => {

  try {

    const user = await findUserById(userId);
    status200(res, user);

  } catch (error) {
    error404(res, error);
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

const changeUser = async (req, res, userId) => {
  try {
    const user = await findUserById(userId);
    const body = await getDataBody(req);
    const userBody = JSON.parse(body);
    const changedData = await change(userBody, user);

    status200(res, changedData);

  } catch (error) {
   error404(res, error);
  }

};

const deleteUser = async (req, res, userId) => {
  try {
    const user = await findUserById(userId);
    const getNewData = await deleteUserById(userId);

    status200(res, getNewData);

  } catch (error) {
    error404(res, error);
  };

};

export {
  getUsers,
  getUser,
  setUser,
  changeUser,
  deleteUser
};