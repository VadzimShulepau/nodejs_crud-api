import apiData from './apiData.json' assert { type: 'json' };
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
      const user = apiData.find(item => {
        return item.id === userId;
      });

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
      }

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
    }
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

      const newData = apiData.filter(item => {
        if (item.id !== userId) {
          return item;
        };
      });

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
  try {
    
    writeFile('src/apiData.json', JSON.stringify(data), err => {
      if (err) {
        throw new Error('Operation failed');
      };
    });

  } catch (error) {
    throw new Error('Operation failed');
  };

};

export {
  findUsers,
  findUserById,
  create,
  change,
  deleteUserById,
  getDataBody
};
