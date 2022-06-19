## [Assigment link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)
## Deadline - 19.06.2022
## Basic Scope. Total: 72.

- **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- **+10** **GET** `api/user` implemented properly
- **+10** **GET** `api/user/${userId}` implemented properly
- **+10** **POST** `api/user` implemented properly
- **+10** **PUT** `api/user/{userId}` implemented properly
- **+10** **DELETE** `api/user/${userId}` implemented properly
- **+6** Users are stored in the form described in the technical requirements
- **+6** Value of `port` on which application is running is stored in `.env` file

## Advanced Scope. Total - 10.
- **+10** Processing of requests to non-existing endpoints implemented properly

## Total score - 82.

## Usage:
 - start server - `npm run start:dev` with nodemon, if `npm run start:prod` app the application is parsed into a folder `/dist`.
 - get all users - **GET** `http://localhost:3000/api/users`;
 - get once user - **GET** `http://localhost:3000/api/users/userId`;
 - post new user - **POST** `http://localhost:3000/api/users`;
 - update user data - **PUT** `http://localhost:3000/api/users/userId`;
 - delete user - **DELETE** `http://localhost:3000/api/users/userId`;