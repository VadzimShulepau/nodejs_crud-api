import apiData from '../apiData.json' assert { type: 'json' };
import { writeFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

const findUsers = () => {
  return new Promise((response, reject) => {
    try {
      if (apiData) {
        response(apiData);
      } else {
        reject(new Error('Data failed or not found'));
      }
    } catch (error) {
      console.log(error);
    };
  });
};

const findUserById = (userId) => {
  return new Promise((response, reject) => {
    try {
      const user = apiData.find(item => item.id === userId);

      if (!user) {
        reject(new Error('User not found.'));
      };

      response(user);
    } catch (error) {
      console.log(error);
    };
  });
};

const create = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };

    try {
      if (Object.values(newUser).length === 4) {

        writeDataToJson([...apiData, newUser]);
        resolve(newUser);

      } else {
        reject(new Error('Fill in required fields.'));
      };

    } catch (error) {
      console.log(err)
    };
  });
};

const getDataBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', data => {
        body += data.toString();
      });

      req.on('end', async () => {
        resolve(body);
      });
    } catch (error) {
      reject(new Error('Invalid request.'));
    };
  });

};

const change = (newBody, user) => {
  return new Promise((resolve, reject) => {
    try {
      const newData = apiData.map(item => item.id === user.id ? item = { ...item, ...newBody } : item);

      if (newData) {
        writeDataToJson(newData);

        resolve(newData);
      } else {
        reject(new Error('Operation failed'));
      };

    } catch (error) {
      console.log(error);
    };

  });
};

const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const newData = apiData.filter(item => item.id !== userId && item);

      if (!newData) {
        reject(new Error('User not found.'));
      };
      if (newData.length === apiData.length) {
        reject(new Error('Operation failed.'))
      };

      writeDataToJson(newData);
      resolve(newData);

    } catch (error) {
      console.log(error);
    };
  });

};

const writeDataToJson = (data) => {
  const operationFailed = 'Operation failed';
  try {
    let jsonData = JSON.stringify(data);
    const dataPath = resolve(process.cwd(), 'apiData.json');
    
    writeFile(dataPath, jsonData, err => {
      if (err) {
        throw new Error(operationFailed);
      };
    });

  } catch (error) {
    throw new Error(operationFailed);
  };

};

const deleteData = (data) => {
  writeDataToJson(data);
};

export {
  findUsers,
  findUserById,
  create,
  change,
  deleteUserById,
  getDataBody,
  deleteData
};
