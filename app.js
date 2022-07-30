const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { routes } = require("./src/routes");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

const PUBLIC_FOLDER = path.join(__dirname, "public");

app.use(express.static(PUBLIC_FOLDER));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use(routes);

async function main() {
  await mongoose.connect("mongodb://localhost:27017");
  console.log("Connected to db");

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
