const { celebrate, Joi } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { login, createUser } = require('../controllers/userControllers');
const NotFoundError = require('../errors/NotFoundError');

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
        .max(30)
        .empty('')
        .default('Жак-Ив Кусто'),
      about: Joi.string()
        .trim(true)
        .min(2)
        .max(30)
        .empty('')
        .default('Исследователь'),
      avatar: Joi.string()
        .trim(true)
        .regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
        .uri()
        .empty('')
        .default(
          'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
        ),
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
