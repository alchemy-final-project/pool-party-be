const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const TenantService = require('../services/TenantService');

const attachCookie = (res, tenant) => {
  res.cookie('session', TenantService.authToken(tenant), {
    httpOnly: true,
    maxAge: 1000 * 60 * 15, // 15 minutes?
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // are these key values necessary?
    secure: process.env.NODE_ENV === 'production' // are these key values necessary?
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    TenantService
      .create(req.body)
      .then(tenant => {
        attachCookie(res, tenant);
        res.send(tenant);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    TenantService
      .authorize(req.body)
      .then(tenant => {
        attachCookie(res, tenant);
        res.sender(tenant);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.tenant);
  });

