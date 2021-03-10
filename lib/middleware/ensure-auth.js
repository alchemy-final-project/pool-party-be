const TenantService = require('../services/TenantService');

module.exports = (req, res, next) => {
  try {
    console.log('Console log in ensure-auth     ' + req);
    const token = req.cookies.session;
    req.tenant = TenantService.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
