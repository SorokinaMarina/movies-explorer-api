const jwt = require('jsonwebtoken');
const { JWT_SECRET_DEV } = require('../models/config');

const { JWT_SECRET, NODE_ENV } = process.env;
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new Unauthorized('Неправильные почта или пароль.'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'prodaction' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    return next(new Unauthorized('Неправильные почта или пароль.'));
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
