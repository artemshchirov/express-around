const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { login, createUser } = require('../controllers/userControllers');
const NotFoundError = require('../errors/NotFoundError');

routes.post('/signin', login);
routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().max(30).empty('').default('Frodo Baggins'),
      about: Joi.string().max(30).empty('').default('Middle-earth explorer'),
      avatar: Joi.string()
        .uri()
        .empty('')
        .default(
          'https://github.com/artemshchirov/mesto/blob/main/src/images/frodo.jpg'
        ),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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
