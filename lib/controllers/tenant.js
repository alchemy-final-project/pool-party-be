const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Tenant = require('../models/Tenant');

module.exports = Router()
    .get('/poolparty', ensureAuth, (req, res, next) => {
        Tenant
            .findByOwnerId(req.tenant.ownerId)
            .then(tenant => res.send(tenant))
            .catch(next);
    });

