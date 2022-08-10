const { celebrate, Joi } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { login, createUser } = require('../controllers/userControllers');
const NotFoundError = require('../errors/NotFoundError');
const { validateURL } = require('../utils/validateURL');

routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .trim(true)
        .email()
        .required(),
      password: Joi.string()
        .trim(true)
        .required(),
    }),
  }),
  login
);

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .trim(true)
        .min(2)
        .max(30),
      about: Joi.string()
        .trim(true)
        .min(2)
        .max(30),
      avatar: Joi.string()
        .trim(true)
        .custom(validateURL),
      email: Joi.string()
        .trim(true)
        .email()
        .required(),
      password: Joi.string()
        .trim(true)
        .required(),
    }),
  }),
  createUser
);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use('/', (req, res, next) => {
  const err = new NotFoundError('404 Not Found Error');
  next(err);
});

module.exports = { routes };
