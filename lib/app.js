const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51IQLH1AlZQgGODSJGfr0Py4pIVWNOGSXJYuJyFEnoqbXOLORfwRdMIsf21nzXlkk3T8AUCK2u39mqv4TH32edFri00wIslVheu');
app.use(require('cors')());
app.use(express.json());

app.post('/api/v1/charge', async(req, res) => {
  console.log(req.body);
  const response = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    payment_method: req.body.paymentMethod,
    amount: 500,
    currency: 'usd',
    transfer_data: {
      destination: 'acct_1IQL66IeCmjuYBJU',
    },
  });

  console.log(response);

});


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;


