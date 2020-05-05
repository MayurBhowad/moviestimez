const Validator = require('validator');
const isEmpty = require('./is-empty.validation');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.movietitle = !isEmpty(data.movietitle) ? data.movietitle : '';
  data.director = !isEmpty(data.director) ? data.director : '';
  data.releasedate = !isEmpty(data.releasedate) ? data.releasedate : '';

  if (Validator.isEmpty(data.movietitle)) {
    errors.movietitle = 'Title Field is requird!';
  }

  if (Validator.isEmpty(data.director)) {
    errors.director = 'Director Field is requird!';
  }

  if (Validator.isEmpty(data.releasedate)) {
    errors.releasedate = 'Release date Field is requird!';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
