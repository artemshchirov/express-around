const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./src/routes/routes.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use((req, res, next) => {
  req.user = {
    _id: '62e64c0f2b9f35a3909acaff',
  };
  next();
});

app.use(routes);

function main() {
  const url = 'mongodb://localhost:27017/mestodb';
  try {
    mongoose.connect(url, (err) => {
      if (err) throw err;
      console.log('Connected to db');
    });
  } catch (err) {
    throw new Error(err.message);
  }

  app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
