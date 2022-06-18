import apiData from './apiData.json' assert { type: 'json' };
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs';
import { resolve } from 'path';

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
    const newUser = { id: uuidv4(), ...prod };

    try {
      if (Object.values(newUser).length === 4) {
        const data = JSON.stringify([...apiData, newUser]);

        writeFile('src/apiData.json', data, err => {
          if (err) {
            console.log(err);
          };
        });
        resolve(newUser);

      } else {
        throw new Error('Fill in required fields.');
      }

    } catch (error) {
      reject(error);
    };
  });
};

const getDataBody = (req) => {
  return new Promise((resolve, reject)=>{
    try {
      let body = '';

      req.on('data', data => {
        body += data.toString();
      });
  
      req.on('end', async () => {
         resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });

};

export {
  findUsers,
  findUserById,
  create,
  getDataBody
};
