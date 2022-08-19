const { celebrate, Joi } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { validateURL } = require('../utils/validateURL');
const { login, createUser } = require('../controllers/userControllers');
const NotFoundError = require('../errors/NotFoundError');

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().trim(true).email().required(),
      password: Joi.string().trim(true).required(),
      name: Joi.string().trim(true).min(2).max(30),
      about: Joi.string().trim(true).min(2).max(30),
      avatar: Joi.string().trim(true).custom(validateURL),
    }),
  }),
  createUser
);

routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().trim(true).email().required(),
      password: Joi.string().trim(true).required(),
    }),
  }),
  login
);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use('/', (req, res, next) => {
  const err = new NotFoundError('404 Not Found Error');
  next(err);
});

module.exports = { routes };
