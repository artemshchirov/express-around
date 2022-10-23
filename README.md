# AROUND X BACKEND

## Project Link

<https://around.nomoredomains.sbs>

## Description

This project creates REST API for the [Around React project](https://github.com/artemshchirov/react-around) connected to the MongoDB database. When the service is started it connects to the mongo server locally using the url `mongodb://localhost:27017/mestodb`. The application sets up the user and card scheme. Some fields of the scheme are validated using regular expressions.

## Functionality

### Card routes

- GET /cards - returns all cards from the database;
- POST /cards - creates a card with title and image link given in the body of the query;
- DELETE /cards/:cardId - deletes a card with specified \_id;
- PUT /cards/:cardId - sets a like on the card with a given \_id;

### User routes

- GET /users - returns all users from the database;
- GET /users/me - returns the current active user;
- GET /users/:userId - returns a user with a specified \_id;
- POST /users - creates a user with name, about and avatar specified in the body of the query;
- PATCH users/me - updates user information;
- PATCH user/me/avatar - updates user pic link;

### User controllers

- createUser controller adds fields of email and password used for user registration. The password is hashed before it's added to the database
- creates controller for user login

### Validation

- The queries that reach the server are getting validated with via celebrate middleware and joi validation library.
- Validation and server errors are handled and returned

API is protected with authorization middleware.

## Technologies

- Express.js
- API REST
- MongoDB
- Celebrate & Joi validation

## Install the project

```bash
git clone https://github.com/artemshchirov/react-around.git
npm install
npm run dev / npm run start
```

### Further improvements

Current and updated version of this project ([link to the repository](https://github.com/artemshchirov/react-around-api-full/tree/main/backend)) and the frontend was written for it ([frontend repository](https://github.com/artemshchirov/react-around-api-full/tree/main/frontend)).
