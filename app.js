const express = require("express");
const { dirname } = require("path");
const path = require("path");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

const PUBLIC_FOLDER = path.join(__dirname, "public");

app.use(express.static(PUBLIC_FOLDER));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
