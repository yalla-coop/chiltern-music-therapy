import Boom from '@hapi/boom';

module.exports = (roles) => (req, res, next) => {
  try {
    const { user = {} } = req;
    const { role } = user;

    if (!role || !roles.includes(role)) {
      throw Boom.forbidden();
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
