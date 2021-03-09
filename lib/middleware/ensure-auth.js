const TenantService = require('../services/TenantService');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    req.tenant = TenantService.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
