const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

exports.errorMessage = (err, req, res) => {
  switch (err.name) {
    case "CastError":
      res.status(BAD_REQUEST).send({
        message: "Переданы некорректные данные",
      });
      return;

    case "ValidationError":
      res.status(BAD_REQUEST).send({
        message: err.message,
      });
      return;

    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({
        message: "Объект не найден",
      });
      return;

    default:
      res.status(INTERNAL_SERVER_ERROR).send({
        message: "На сервере произошла ошибка",
      });
  }
};
