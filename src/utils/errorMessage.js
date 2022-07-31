const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("./constants");

exports.errorMessage = (err, req, res) => {
  switch (err) {
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
