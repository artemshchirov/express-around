const routes = require('express').Router();
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { NOT_FOUND } = require('../utils/constants');
const { login, createUser } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

routes.post('/signin', login);
routes.post('/signup', createUser);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use('/', (req, res) => {
  res.status(NOT_FOUND).send({ message: '404 Page Not Found' });
});

module.exports = { routes };
