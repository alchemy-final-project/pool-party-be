const stripe = require('stripe')('sk_test_51IQLH1AlZQgGODSJGfr0Py4pIVWNOGSXJYuJyFEnoqbXOLORfwRdMIsf21nzXlkk3T8AUCK2u39mqv4TH32edFri00wIslVheu');




//This was successful at confirming a payment that was set as incomplete.
// To create a PaymentIntent for confirmation, see our guide at: https://stripe.com/docs/payments/payment-intents/creating-payment-intents#creating-for-automatic
const confirmAttempt = async() => {
  const response = await stripe.paymentIntents.confirm(
    'pi_1IRggFAlZQgGODSJmQWgIwn5',
    { payment_method: 'pm_1IRggFAlZQgGODSJJXdKd2QR' }
  );

  console.log(response);
};
confirmAttempt();



