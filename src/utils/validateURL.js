const validator = require('validator');

const validateURL = (value, helper) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Invalid URL');
  }
  return value;
};

module.exports = { validateURL };
