const {
  BAD_REQUEST,
  UNAUTHORIZED,
  AUTHORIZED_BUT_FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('./constants');

exports.showErrorMessage = (err, req, res) => {
  console.log('err: ', err.name);
  switch (err.name) {
    case 'CastError':
      res.status(BAD_REQUEST).send({
        message: '400 Bad Request',
      });
      return;

    case 'ValidationError':
      res.status(BAD_REQUEST).send({
        message: `${err.message}`,
      });
      return;

    case 'Unauthorized':
      res.status(UNAUTHORIZED).send({
        message: '401 Unauthorized',
      });
      return;

    case 'Forbidden':
      res.status(AUTHORIZED_BUT_FORBIDDEN).send({
        message: '403 Authorized But Forbidden',
      });
      return;

    case 'DocumentNotFoundError':
      res.status(NOT_FOUND).send({
        message: '404 Document Not Found',
      });
      return;

    case 'Conflict':
      res.status(CONFLICT).send({
        message: '409 Conflict',
      });
      return;

    default:
      res.status(INTERNAL_SERVER_ERROR).send({
        message: '500 Internal Server Error',
      });
  }
};
