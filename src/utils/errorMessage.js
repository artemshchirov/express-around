const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("./constants");

exports.errorMessage = (err, req, res) => {
  switch (err.name) {
    case "CastError":
      res.status(BAD_REQUEST).send({
        message: "400 Bad Request",
      });
      return;

    case "ValidationError":
      res.status(BAD_REQUEST).send({
        message: err.message,
      });
      return;

    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({
        message: "404 Document Not Found",
      });
      return;

    default:
      res.status(INTERNAL_SERVER_ERROR).send({
        message: "500 Internal Server Error",
      });
  }
};
