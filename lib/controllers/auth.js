const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const TenantService = require('../services/TenantService');

const attachCookie = (res, tenant) => {
  res.cookie('session', TenantService.authToken(tenant), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.DOMAIN
  });
};

//When clear cookie is written needs to have 
  // httpOnly: true,
  // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  // secure: process.env.NODE_ENV === 'production' 

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
        res.send(tenant);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.tenant);
  });

