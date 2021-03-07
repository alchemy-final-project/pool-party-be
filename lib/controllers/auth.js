const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/TenantService');

const attachCookie = (res, user) => {
  res.cookie('session', UserService.authToken(user), {
    httpOnly: true,
    maxAge: 1000 * 60 * 15, // 15 minutes?
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // are these key values necessary?
    secure: process.env.NODE_ENV === 'production' // are these key values necessary?
  });
};
module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => {
        attachCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        attachCookie(res, user);
        res.sender(user);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });

