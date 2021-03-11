const { Router } = require('express');
const Owner = require('../models/Owner');

module.exports = Router()
  .get('/', (req, res) => {
    Owner
      .find()   
      .then(owner => {
        res.send(owner);
      });
  });
