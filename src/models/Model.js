import apiData from '../data/apiData.json' assert { type: 'json' };
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs';

const findUsers = () => {
  return new Promise((response, reject) => {
    try {
      response(apiData);
    } catch (error) {
      reject('Data failed or not found');
    };
  });
};

const findUserById = (userId) => {
  return new Promise((response, reject) => {
    try {
      const product = apiData.find(item => {
        return item.id === userId;
      });
      response(product);
    } catch (error) {
      reject('Failed input.');
    };
  });
};

const create = (prod) => {
  return new Promise((resolve, reject) => {
    try {
      const newUser = { id: uuidv4(), ...prod };
      const data = JSON.stringify([...apiData, newUser]);

      writeFile('src/data/apiData.json', data, err => {
        if (err) {
          console.log(err);
        };
      });
      resolve(newUser);
    } catch (error) {
      reject('Failed input.');
    };
  });
};

export {
  findUsers,
  findUserById,
  create
};
