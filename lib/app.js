const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51IQLH1AlZQgGODSJGfr0Py4pIVWNOGSXJYuJyFEnoqbXOLORfwRdMIsf21nzXlkk3T8AUCK2u39mqv4TH32edFri00wIslVheu');

app.use(require('cors')({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/api/v1/owners', require('./controllers/owners'));
app.use('/api/v1/tenants', require('./controllers/tenant'));
app.use('/api/v1/transactions', require('./controllers/transactions'));

app.post('/api/v1/charge', async (req, res) => {
  //console.log(req.body);
  const response = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    payment_method: req.body.paymentMethod,
    amount: 500,
    currency: 'usd',
    transfer_data: {
      destination: 'acct_1IQL66IeCmjuYBJU',
    },
  });

  //console.log(response);

});


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;


