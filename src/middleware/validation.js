// validation module

const { BadRequest } = require("../lib/errors");

module.exports = (schema, property) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req[property], { convert: false });
    if (error) throw new BadRequest(error.message);
    req[property] = value;
    next();
  };
};
