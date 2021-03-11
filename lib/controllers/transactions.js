//use TransactionService.create()
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const TransactionService = require('../services/TransactionService');
const Transaction = require('../models/Transaction');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    TransactionService
      .create({ 
        ownerId: req.tenant.ownerId,
        tenantId: req.tenant.id,
        amount: req.tenant.monthlyCost,
        rentYear: req.body.rentYear,
        rentMonth: req.body.rentMonth,
        paymentMethodId: req.body.paymentMethodId
      })
      .then(transaction => res.send(transaction))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Transaction
      .findByOwnerId(req.tenant.ownerId)
      .then(tenant => res.send(tenant))
      .catch(next);
  })
  .get('/paymentStatus', ensureAuth, (req, res, next) => {
    Transaction
      .getPaymentStatus(req.tenant.ownerId)
      .then(tenant => res.send(tenant))
      .catch(next);
  });
